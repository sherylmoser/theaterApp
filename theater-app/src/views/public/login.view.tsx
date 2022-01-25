import { Header } from '../../Components/header/Header';
import { ChangeEvent, useState } from 'react';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import '../../styles/signup.view.css';

export function LoginView() {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState<string | ''>('');

	const nav = useNavigate();

	async function submitHandler(e: ChangeEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			await auth.signInWithEmailAndPassword(email, password);
			setEmail('');
			setPassword('');
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
			<div className="pj-form">
				<form onSubmit={submitHandler}>
					<input required onChange={emailHandler} value={email} type="email" placeholder="Email" />
					<input
						required
						onChange={passwordHandler}
						value={password}
						type="password"
						placeholder="Password"
					/>
					<input type="submit" value="Login" />
				</form>
			</div>
		</div>
	);
}
