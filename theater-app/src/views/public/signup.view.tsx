import { ChangeEvent, useContext, useState } from 'react';
import { auth } from '../../firebase';
import firebase from 'firebase';
import { Header } from '../../Components/header/Header';

export default function SignupView() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState<string | ''>('');
    const [ name, setName ] = useState<string | ''>('')
	const [ zipCode, setZipCode ] = useState<string | ''>('')

	async function submitHandler(e: ChangeEvent<HTMLFormElement>) {
		e.preventDefault();
        try {
            const cred = await auth.createUserWithEmailAndPassword(email, password);
            const uid = cred.user?.uid;
            firebase.firestore().collection('users').doc(uid)
                .set({
                    user_uid: uid,
                    name: name,
					zipCode: zipCode,
					connectedTheaters: ['whasdt','qwefsdf']
                })
            setEmail('');
            setPassword('');
            setName('');
            setZipCode('')
        } catch(e) {
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
    
	return (
		<div className="App">
			<Header />
			<form onSubmit={submitHandler}>
				<input required onChange={emailHandler} value={email} type="email" placeholder='Email' />
				<input required onChange={passwordHandler} value={password} type="password" placeholder='Password' />
				<input required onChange={nameHandler} value={name} type="text" placeholder='Name' />
				<input type="text" onChange={zipCodeHandler} value={zipCode} placeholder='Zip Code'/>
				<input type="submit" value="Sign Up" />
			</form>
		</div>
	);
}
