import { GoogleLogin } from "@react-oauth/google";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const GOOGLE_REDIRECT_LOGIN_URI =
  import.meta.env.VITE_GOOGLE_REDIRECT_LOGIN_URI ||
  "http://127.0.0.1:5000/api/auth/google/redirect";

export default function Login({ containerProps, ...googleLoginProps }) {
  const { login } = useAuth();

  const handleSuccess = async (credentialResponse) => {
    if (!credentialResponse.credential) {
      console.error("Google login did not return a credential.");
      return;
    }

    try {
      const res = await api.post("/auth/google", {
        credential: credentialResponse.credential,
      });

      login(res.data); // 🔥 store in context
    } catch (err) {
      console.error("Google login failed", err.response?.data ?? err.message);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
      ux_mode="redirect"
      login_uri={GOOGLE_REDIRECT_LOGIN_URI}
      containerProps={containerProps}
      {...googleLoginProps}
    />
  );
}
