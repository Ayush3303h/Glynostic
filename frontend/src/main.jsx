import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";

import App from './App.jsx'

const SHOULD_REDIRECT_LOCALHOST =
  import.meta.env.DEV && window.location.hostname === "localhost";

if (SHOULD_REDIRECT_LOCALHOST) {
  const port = window.location.port ? `:${window.location.port}` : "";
  window.location.replace(
    `http://127.0.0.1${port}${window.location.pathname}${window.location.search}${window.location.hash}`
  );
}

const GOOGLE_CLIENT_ID =
  import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!GOOGLE_CLIENT_ID) {
  throw new Error("Missing VITE_GOOGLE_CLIENT_ID in frontend/.env");
}

if (!SHOULD_REDIRECT_LOCALHOST) {
  createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </GoogleOAuthProvider>
  )
}
