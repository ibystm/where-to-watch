import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SiginIn } from "./features/components/sign-in/SignIn";
import { SiginUp } from "./features/components/sign-up/SignUp";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SiginIn />} />
          <Route path="/signin" element={<SiginIn />} />
          <Route path="/signup" element={<SiginUp />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
