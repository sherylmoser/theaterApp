import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";

export function UserProfile() {
    const user = useContext(AuthContext)
    const uid = user?.uid;
    console.log("User UID", uid);

    db.collection("users").doc(uid)
        .onSnapshot((doc) => {
            console.log("Current data: ", doc.data());
        });
    return (
        <div>
            <h1>User Profile</h1>
        </div>
    )
}