import { ChangeEvent, useState } from "react";
import { auth } from '../../firebase';
import firebase from 'firebase';


export function LoginView() {
    const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState<string | ''>('');

    async function submitHandler(e: ChangeEvent<HTMLFormElement>) {
		e.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email,password);
            setEmail('');
            setPassword('');
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

    return (
        <form onSubmit={submitHandler}>
            <input required onChange={emailHandler} value={email} type="email" placeholder='Email' />
			<input required onChange={passwordHandler} value={password} type="password" placeholder='Password' />
            <input type="submit" value="Login" />
        </form>
    )
}