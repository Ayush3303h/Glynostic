import { GoogleLogin } from "@react-oauth/google";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";


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
      ux_mode="popup"
      containerProps={containerProps}
      {...googleLoginProps}
    />
  );
}
