import firebase from "firebase/compat/app";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../app/firebase";
import { useActions } from "../hooks/useActions";
import { actions } from "../store";

type AuthContextType = {
  currentUser: firebase.User | null;
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const value = {
    currentUser,
  };

  useEffect(() => {
    const unscribe = auth.onAuthStateChanged((user) => {
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

export const useGetAuth = () => {
  const { storeUser } = useActions(actions);

  useEffect(() => {
    const unscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        storeUser({
          email: user.email,
          id: user.uid,
          userName: user.displayName,
        });
      }
    });
    return () => unscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
