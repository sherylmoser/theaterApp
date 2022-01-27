import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import firebase from "firebase/app";
import { auth, db } from "../firebase";

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>()

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  async function onLogin(email: string, password: string) {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password)
      window.localStorage.setItem("loggedIn", "true")
      setLoggedIn(true)
      const docRef = db.collection("theaters").doc(`${user?.uid}`);


      await docRef.get().then((doc) => {
        if (doc.exists) {
          window.localStorage.setItem("TheaterCompany", "true")
        }
      })
    }
    catch (e) {
      alert(e)
    }
  }

  function onLogout() {
    auth.signOut();
    setLoggedIn(false);
    window.localStorage.removeItem("TheaterCompany");
    window.localStorage.removeItem("loggedIn");
  }

  return <AuthContext.Provider value={{ user, loggedIn, onLogin, onLogout }}>{children}</AuthContext.Provider>;
};