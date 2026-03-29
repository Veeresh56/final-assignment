import { useEffect } from "react";
import { login } from "./auth/authService";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
  const token = localStorage.getItem("token");
  
  if (!token && !window.location.search.includes("code")) {
    login();
  }
  }, []);

  return <AppRoutes />;
}

export default App;