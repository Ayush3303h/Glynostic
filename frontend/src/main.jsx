import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react';
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

const CLERK_KEY =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "pk_test_Zmlyc3Qtd29tYmF0LTI3LmNsZXJrLmFjY291bnRzLmRldiQ";

if (!SHOULD_REDIRECT_LOCALHOST) {
  createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={CLERK_KEY}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ClerkProvider>
  )
}
