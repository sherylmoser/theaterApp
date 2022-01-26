import { ChangeEvent, useContext, useState } from 'react';
import { auth } from '../../firebase';
import firebase from 'firebase';
import { useNavigate, useRoutes } from 'react-router-dom';

export default function TheaterSignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState<string | ''>('');
    const [name, setName] = useState<string | ''>('')
    const [zipCode, setZipCode] = useState<string | ''>('')
    const [phone, setPhoneNumber] = useState<string | ''>('')
    const [website, setWebsite] = useState<string | ''>('')

    const nav = useNavigate()
    async function submitHandler(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const cred = await auth.createUserWithEmailAndPassword(email, password);
            const uid = cred.user?.uid;
            firebase.firestore().collection('theaters').doc(uid)
                .set({
                    theater_uid: uid,
                    name: name,
                    email: email,
                    phone: phone,
                    website: website,
                    zipCode: zipCode,
                })
            setEmail('');
            setPassword('');
            setName('');
            setZipCode('')
            setPhoneNumber('');
            setWebsite('');
            window.localStorage.setItem("TheaterCompany", "true")
            nav('/profile');
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
    function nameHandler(e: ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)
    }
    function zipCodeHandler(e: ChangeEvent<HTMLInputElement>) {
        setZipCode(e.target.value)
    }
    function phoneHandler(e: ChangeEvent<HTMLInputElement>) {
        setPhoneNumber(e.target.value)
    }
    function websiteHanlder(e: ChangeEvent<HTMLInputElement>) {
        setWebsite(e.target.value)
    }
    return (
        <div className="App">
            <form onSubmit={submitHandler}>
                <input required onChange={emailHandler} value={email} type="email" placeholder='Email' />
                <input required onChange={passwordHandler} value={password} type="password" placeholder='Password' />
                <input required onChange={nameHandler} value={name} type="text" placeholder='Theater Name' />
                <input required type="tel" onChange={phoneHandler} value={phone} placeholder='Phone Number' />
                <input type='url' onChange={websiteHanlder} value={website} placeholder='https://www.YourTheaterWebsiteHere.com' />
                <input type="text" onChange={zipCodeHandler} value={zipCode} placeholder='Zip Code' />
                <input type="submit" value="Sign Up" />
            </form>
        </div>
    );
}