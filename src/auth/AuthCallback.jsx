import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthCallback() {
  const navigate = useNavigate();

  const exchangeToken = async (code) => {
  try {
    console.log("STEP 1: Got code →", code);

    const codeVerifier = localStorage.getItem("code_verifier");
    console.log("STEP 2: Code Verifier →", codeVerifier);

    const res = await fetch(
      "https://idbi-auth-stage.isupay.in/application/o/token/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: "h0xLFWq1FS6uHKVwk",
          code,
          redirect_uri: "http://localhost:3000/redirected",
          code_verifier: codeVerifier,
        }),
      }
    );

    console.log("STEP 3: Response status →", res.status);

    const data = await res.json();

    console.log("STEP 4: TOKEN RESPONSE →", data);

    if (res.ok && data.access_token) {
      console.log("STEP 5: Token found ✅");

      localStorage.setItem("token", data.access_token);

      console.log("STEP 6: Token saved →", data.access_token);

      navigate("/dashboard");
    } else {
      console.error("Token Error:", data);
      alert(data.error_description || "Login failed");
    }

  } catch (err) {
    console.error("Catch Error:", err);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      exchangeToken(code);
    }
  });

  return <p>Logging in...</p>;
}

export default AuthCallback;