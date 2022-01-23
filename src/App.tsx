import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { RoutesWrapper } from "./features/components/wrapper/RoutesWrapper";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RoutesWrapper />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
