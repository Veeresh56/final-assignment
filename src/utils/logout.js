import { storage } from "./storage";

const END_SESSION_ENDPOINT = import.meta.env.VITE_END_SESSION_ENDPOINT;
const POST_LOGOUT_REDIRECT_URI =
  import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI || window.location.origin;

export const logoutUser = () => {
  const idToken = localStorage.getItem("id_token");

  storage.clearAllSession();

  if (!END_SESSION_ENDPOINT) {
    window.location.replace("/");
    return;
  }

  const params = new URLSearchParams();

  if (idToken) {
    params.set("id_token_hint", idToken);
  }

  params.set("post_logout_redirect_uri", POST_LOGOUT_REDIRECT_URI);

  window.location.replace(`${END_SESSION_ENDPOINT}?${params.toString()}`);
};