import { authConfig } from "./authConfig";

// 🔐 generate random string
const generateRandomString = (length = 64) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map(x => chars[x % chars.length])
    .join("");
};

// 🔐 SHA256
const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return crypto.subtle.digest("SHA-256", data);
};

// 🔐 base64 url encode
const base64urlencode = (buffer) => {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const login = async () => {
  const codeVerifier = generateRandomString();
  localStorage.setItem("code_verifier", codeVerifier);

  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64urlencode(hashed);

  const state = generateRandomString(16);

  const authUrl =
    `https://idbi-auth-stage.isupay.in/application/o/authorize/?` +
    `client_id=${authConfig.clientId}` +
    `&response_type=code` +
    `&redirect_uri=${encodeURIComponent(authConfig.redirectUri)}` +
    `&scope=${authConfig.scopes.join(" ")}` +
    `&state=${state}` +
    `&code_challenge=${codeChallenge}` +
    `&code_challenge_method=S256`;

  window.location.href = authUrl;
};