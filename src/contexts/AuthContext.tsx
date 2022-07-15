import firebase from "firebase/compat/app";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../app/firebase";
import { storeUser } from "../store/slices/usersSlice";

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
  const dispatch = useDispatch();

  useEffect(() => {
    const unscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          storeUser({
            email: user.email,
            id: user.uid,
            userName: user.displayName,
          })
        );
      }
    });
    return () => unscribe();
  }, [dispatch]);
};
