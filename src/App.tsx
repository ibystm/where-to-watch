import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { RoutesWrapper } from "./features/wrapper/RoutesWrapper";

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RoutesWrapper />
      </BrowserRouter>
    </AuthProvider>
  );
};
