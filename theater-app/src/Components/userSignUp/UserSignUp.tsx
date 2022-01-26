import { ChangeEvent, useState } from 'react';
import { auth } from '../../firebase';
import firebase from 'firebase';
import { useNavigate } from 'react-router-dom';

export default function UserSignUp() {

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState<string | ''>('');
    const [ firstName, setFirstName ] = useState<string | ''>('')
    const [ lastName, setLastName ] = useState<string | ''>('')
	const [ zipCode, setZipCode ] = useState<string | ''>('')

	const nav = useNavigate()

	async function submitHandler(e: ChangeEvent<HTMLFormElement>) {
		e.preventDefault();
        try {
            const cred = await auth.createUserWithEmailAndPassword(email, password);
            const uid = cred.user?.uid;
            firebase.firestore().collection('users').doc(uid)
                .set({
                    user_uid: uid,
                    firstName: firstName,
                    lastName: lastName,
					zipCode: zipCode,
					connectedTheaters: []
                })
			const user = firebase.auth().currentUser;
			await user?.updateProfile({
				displayName: firstName
			  })
            setEmail('');
            setPassword('');
            setFirstName('');
			setLastName('')
            setZipCode('');
			nav('/')
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
    function firstNameHandler(e: ChangeEvent<HTMLInputElement>) {
        setFirstName(e.target.value)
    }
    function lastNameHandler(e: ChangeEvent<HTMLInputElement>) {
        setLastName(e.target.value)
    }
	function zipCodeHandler(e: ChangeEvent<HTMLInputElement>) {
		setZipCode(e.target.value)	
	}
    
	return (
		<div className="App">
			<form onSubmit={submitHandler}>
				<input required onChange={emailHandler} value={email} type="email" placeholder='Email' />
				<input required onChange={passwordHandler} value={password} type="password" placeholder='Password' />
				<input required onChange={firstNameHandler} value={firstName} type="text" placeholder='First Name' />
				<input required onChange={lastNameHandler} value={lastName} type="text" placeholder='Last Name' />
				<input type="text" onChange={zipCodeHandler} value={zipCode} placeholder='Zip Code'/>
				<input type="submit" value="Sign Up" />
			</form>
		</div>
	);
}
