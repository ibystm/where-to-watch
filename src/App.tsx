import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { ErrorFallback } from "./commons/comoponents/ErrorFallback";
import { AuthProvider } from "./contexts/AuthContext";
import { RoutesWrapper } from "./features/wrapper/RoutesWrapper";

export const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <BrowserRouter>
          <RoutesWrapper />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
};
