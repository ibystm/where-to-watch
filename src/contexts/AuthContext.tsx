import firebase from "firebase/compat/app";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../db/firebase";

type AuthContextType = {
  currentUser: firebase.User | null;
  signUp: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential | undefined>;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const signUp = async (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const value = {
    currentUser,
    signUp,
  };

  useEffect(() => {
    const unscribe = auth.onAuthStateChanged((user) => {
      console.log("unsubscribe");
      setCurrentUser(user);
    });
    return () => unscribe();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Do not use context without wrapping by Provider");
  }
  return context;
};
