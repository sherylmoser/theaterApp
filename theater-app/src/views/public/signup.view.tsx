
import { ChangeEvent, useContext, useState } from 'react';
import { auth } from '../../firebase';
import firebase from 'firebase';
import { Header } from '../../Components/header/Header';
import TheaterSignUp from "../../Components/theaterSignUp/TheaterSignUp";
import UserSignUp from "../../Components/userSignUp/UserSignUp";


export default function SignupView() {
	const [userSignUp, setUserSignUp] = useState<boolean>(true)

	function signUpHandler() {
		setUserSignUp(!userSignUp)
	}

	return (

		<div className="App">
			<Header />
			<div>
				<button disabled={userSignUp} onClick={signUpHandler}>User Sign Up</button>
				<button disabled={!userSignUp} onClick={signUpHandler}>Theater Sign Up</button>
				{userSignUp ? <UserSignUp /> : <TheaterSignUp />}
			</div>
		</div>
	);
}
