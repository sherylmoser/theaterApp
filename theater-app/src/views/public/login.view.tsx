
import { Header } from "../../Components/header/Header";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { auth, db } from '../../firebase';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";



export function LoginView() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState<string | ''>('');

    const user = useContext(AuthContext)

    const nav = useNavigate()

    async function submitHandler(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const { user } = await auth.signInWithEmailAndPassword(email, password);
            setEmail('');
            setPassword('');
            console.log('User UID', `${user}`)

            const docRef = db.collection("theaters").doc(`${user?.uid}`);

            await docRef.get().then((doc) => {
                console.log("DOC", doc)
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    console.log("this worked");
                    window.localStorage.setItem("TheaterCompany", "true")
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
            nav('/');
        } catch (e) {
            alert(e);
        }
    }

    function emailHandler(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }
    function passwordHandler(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }


    return (
        <div>
            <Header />
            <form onSubmit={submitHandler}>
                <input required onChange={emailHandler} value={email} type="email" placeholder='Email' />
                <input required onChange={passwordHandler} value={password} type="password" placeholder='Password' />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}