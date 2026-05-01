import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import mongoose from "mongoose";
import Razorpay from "razorpay";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Static serving for uploads
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use("/uploads", express.static(uploadDir));

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname.replace(/\s+/g, "_"));
  }
});
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } });

app.get("/", (req, res) => {
  res.send("Glynostic Backend is running.");
});

const googleClientIds = (
  process.env.GOOGLE_CLIENT_IDS ||
  process.env.GOOGLE_CLIENT_ID ||
  ""
)
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

if (googleClientIds.length === 0) {
  console.warn("GOOGLE_CLIENT_ID is not set - Google login will fail.");
}

const client = new OAuth2Client();
const frontendUrl = process.env.FRONTEND_URL || "http://127.0.0.1:5174";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, index: true },
    name: { type: String },
    picture: { type: String },
    subscription: {
      plan: { type: String, default: "Free" },
      status: { type: String, default: "inactive" },
      currentPeriodEnd: { type: Date, default: null },
    },
    history: [
      {
        type: { type: String, default: "login" },
        createdAt: { type: Date, default: Date.now },
        meta: { type: mongoose.Schema.Types.Mixed, default: {} },
      },
    ],
    assessmentData: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

let mongoReady = false;
async function connectMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes("<db_password>")) {
    console.warn("MONGODB_URI not set - skipping MongoDB connection.");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
    mongoReady = true;
  } catch (err) {
    mongoReady = false;
    console.error("MongoDB connection failed:", err?.message ?? err);
    // Don't crash the server; auth can still work with JWT-only mode.
  }
}

await connectMongo();

function parseCookies(cookieHeader = "") {
  return cookieHeader.split(";").reduce((cookies, pair) => {
    const separatorIndex = pair.indexOf("=");
    if (separatorIndex === -1) return cookies;
    const key = pair.slice(0, separatorIndex).trim();
    const value = pair.slice(separatorIndex + 1).trim();
    cookies[key] = decodeURIComponent(value);
    return cookies;
  }, {});
}

function buildFrontendRedirect(params) {
  const url = new URL(frontendUrl);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return url.toString();
}

async function createGoogleSession(credential) {
  if (googleClientIds.length === 0) {
    throw new Error("Google OAuth is not configured");
  }

  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: googleClientIds.length === 1 ? googleClientIds[0] : googleClientIds,
  });

  const payload = ticket.getPayload();

  const user = {
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  };

  // Upsert profile in MongoDB so we can show history/subscription later.
  if (mongoReady) {
    try {
      await User.findOneAndUpdate(
        { email: user.email },
        {
          $set: { name: user.name, picture: user.picture },
          $setOnInsert: {
            subscription: { plan: "Free", status: "inactive", currentPeriodEnd: null },
          },
          $push: { history: { type: "login", meta: { provider: "google" } } },
        },
        { upsert: true, returnDocument: "after" }
      );
    } catch (err) {
      console.error("MongoDB user upsert failed:", err?.message ?? err);
    }
  }

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { token, user };
}

app.post("/api/auth/google", async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ error: "Missing Google credential" });
  }

  try {
    res.json(await createGoogleSession(credential));
  } catch (err) {
    console.error("Google token verification failed:", err?.message ?? err);
    res.status(401).json({ error: "Invalid Google token" });
  }
});

app.post("/api/auth/google/redirect", async (req, res) => {
  const body = req.body || {};
  const cookies = parseCookies(req.headers.cookie);
  const csrfToken = body.g_csrf_token;

  if (!csrfToken || !cookies.g_csrf_token || csrfToken !== cookies.g_csrf_token) {
    return res.redirect(303, buildFrontendRedirect({ auth_error: "csrf" }));
  }

  if (!body.credential) {
    return res.redirect(303, buildFrontendRedirect({ auth_error: "missing_google_credential" }));
  }

  try {
    const { token } = await createGoogleSession(body.credential);
    res.redirect(303, buildFrontendRedirect({ token }));
  } catch (err) {
    console.error("Google redirect login failed:", err?.message ?? err);
    res.redirect(303, buildFrontendRedirect({ auth_error: "invalid_google_token" }));
  }
});

app.get("/api/auth/me", async (req, res) => {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).json({ error: "No token" });

  const token = auth.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!mongoReady) return res.json(user);

    const doc = await User.findOne({ email: user.email }).lean();
    if (!doc) return res.json(user);
    res.json(doc);
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

app.post("/api/assessment", async (req, res) => {
  if (!mongoReady) return res.status(500).json({ error: "Database not connected" });

  try {
    const email = req.body.patientInfo?.email || "anonymous@example.com";
    await User.findOneAndUpdate(
      { email: email },
      { $set: { assessmentData: req.body } },
      { upsert: true }
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to save assessment:", err);
    res.status(500).json({ error: "Failed to save assessment" });
  }
});

app.post("/api/upload", upload.array("files", 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }
    const fileUrls = req.files.map((file) => ({
      name: file.originalname,
      url: `http://localhost:5000/uploads/${file.filename}`
    }));
    res.json({ files: fileUrls });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.post("/api/payment/create-order", async (req, res) => {
  try {
    // Ideally verify user token here too, but for simplicity we'll just create the order
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy_key',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
    });

    const options = {
      amount: 49900, // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: "receipt_order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Could not create payment order" });
  }
});

// DOCTOR ENDPOINTS
app.post("/api/doctor/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "doctor@gmail.com" && password === "Glynostic1234") {
    res.json({ token: "fake-doctor-token", success: true });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.get("/api/doctor/patients", async (req, res) => {
  if (!mongoReady) return res.status(500).json({ error: "Database not connected" });
  // Find users who have assessmentData
  try {
    const users = await User.find({ assessmentData: { $exists: true, $ne: null } })
      .select("name email picture assessmentData")
      .sort({ updatedAt: -1 })
      .lean();
    res.json(users);
  } catch (err) {
    console.error("Failed to fetch patients:", err);
    res.status(500).json({ error: "Failed to fetch patients" });
  }
});

app.post("/api/doctor/patients/:id/report", async (req, res) => {
  if (!mongoReady) return res.status(500).json({ error: "Database not connected" });
  const { done } = req.body;
  try {
    await User.findByIdAndUpdate(req.params.id, {
      $set: { "assessmentData.reportDone": done }
    });
    res.json({ success: true });
  } catch (err) {
    console.error("Failed to update report status:", err);
    res.status(500).json({ error: "Failed to update report status" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
