import React from "react";
import firebase from "firebase/app";

type AuthContextType = {
    user: firebase.User | null;
    onLogout?: () => void;
    onLogin?: (email: string, password: string) => void;
    loggedIn?: boolean;
}

export const AuthContext = React.createContext<AuthContextType>({ user: null });