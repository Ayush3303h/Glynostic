import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId="627008406730-ratdjb5j6ib8ns4g13i9n21b1qa7tc3f.apps.googleusercontent.com">
  <AuthProvider>
    <App />
  </AuthProvider>
</GoogleOAuthProvider>
)
