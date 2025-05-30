import { createRoot } from "react-dom/client";
import "./index.css";

// Redirect to the static portfolio site
window.location.href = "/index.html";

// Fallback rendering for React setup
createRoot(document.getElementById("root")!).render(
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontFamily: 'Inter, sans-serif'
  }}>
    <p>Redirecting to portfolio...</p>
  </div>
);
