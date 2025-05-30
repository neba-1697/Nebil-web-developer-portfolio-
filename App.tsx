import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Redirect to static portfolio
    window.location.href = "/index.html";
  }, []);

  return (
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
}

export default App;
