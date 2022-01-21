import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState, ChangeEvent } from "react";

export function SignupView() {
    const [email, setEmail] = useState<string | ''>('')
    const [password, setPassword] = useState<string | ''>('')
    const [fname, setFName] = useState<string | ''>('')
    const [lname, setLName] = useState<string | ''>('')
    const [zipCode, setZipCode] = useState<string | ''>('')

    function passwordHandler(e: ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }

    function emailHandler(e: ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
    }

    function fnameHandler(e: ChangeEvent<HTMLInputElement>) {
        setFName(e.target.value)
    }

    function lnameHandler(e: ChangeEvent<HTMLInputElement>) {
        setLName(e.target.value)
    }

    function zipCodeHandler(e: ChangeEvent<HTMLInputElement>) {
        setZipCode(e.target.value)
    }

    function formHandler(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
    return (
        <form onSubmit={formHandler}>
            <input onChange={fnameHandler} type="text" value={fname} placeholder="First Name" />
            <input onChange={lnameHandler} type="text" value={lname} placeholder="Last Name" />
            <input onChange={zipCodeHandler} type="text" value={zipCode} placeholder="Zip Code" />
            <input onChange={emailHandler} value={email} type="email" name="email" placeholder="Email" />
            <input onChange={passwordHandler} type="password" name="password" value={password} placeholder="Password" />
            <input type="submit" value="Sign Up" />
        </form>
    )
}