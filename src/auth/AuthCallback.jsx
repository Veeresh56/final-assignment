import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authConfig } from "./authConfig";
import { fetchByMobileNumber } from "../services/userApi";
import { storage } from "../utils/storage";

// This component handles the OAuth callback after the user is redirected back from the auth server.
// It processes the authorization code, exchanges it for tokens, and fetches user profiles based on the mobile number.
function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const processLogin = async () => {
      try {
        setError("");

        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const returnedState = params.get("state");
        const savedState = localStorage.getItem("auth_state");
        const codeVerifier = localStorage.getItem("code_verifier");
        const loginMobileNumber = storage.getLoginMobileNumber();

        if (!code) {
          throw new Error("Authorization code not found.");
        }

        if (!returnedState || returnedState !== savedState) {
          throw new Error("Invalid auth state. Please login again.");
        }

        if (!codeVerifier) {
          throw new Error("Missing code verifier. Please login again.");
        }

        if (!loginMobileNumber) {
          throw new Error("Missing login mobile number. Please login again.");
        }

        const tokenResponse = await fetch(authConfig.tokenEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            client_id: authConfig.clientId,
            code,
            redirect_uri: authConfig.redirectUri,
            code_verifier: codeVerifier,
          }),
        });

        const tokenData = await tokenResponse.json();

        if (!tokenResponse.ok || !tokenData.access_token) {
          throw new Error(tokenData.error_description || "Login failed.");
        }

        storage.setToken(tokenData.access_token);

        if (tokenData.id_token) {
          localStorage.setItem("id_token", tokenData.id_token);
        }

        storage.clearAuthArtifacts();

        const fetchByIdResponse = await fetchByMobileNumber(loginMobileNumber);
        const fetchedProfiles = Array.isArray(fetchByIdResponse?.data)
          ? fetchByIdResponse.data
          : [];

        if (fetchedProfiles.length === 0) {
          throw new Error("No VPA records found for this mobile number.");
        }

        storage.setProfileList(fetchedProfiles);
        storage.clearSelectedProfile();

        navigate("/dashboard", { replace: true });
      } catch (err) {
        setError(err.message || "Unable to complete login flow.");
      }
    };

    processLogin();
  }, [navigate]);

  if (!error) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-4">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md">
        <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      </div>
    </div>
  );
}

export default AuthCallback;