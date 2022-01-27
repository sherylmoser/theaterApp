import { ChangeEvent, useContext, useState } from 'react';
import { auth } from '../../firebase';
import firebase from 'firebase';
import { Header } from '../../Components/header/Header';
import TheaterSignUp from '../../Components/theaterSignUp/TheaterSignUp';
import UserSignUp from '../../Components/userSignUp/UserSignUp';

import '../../styles/signup.view.css';

export default function SignupView() {
	const [userSignUp, setUserSignUp] = useState<boolean>(true);

	function signUpHandler() {
		setUserSignUp(!userSignUp);
	}

	return (
		<div>
			<div className="pj-form">
				<div>
					<button className="pj-toggle" disabled={userSignUp} onClick={signUpHandler}>
						User Sign Up
					</button>
					<button className="pj-toggle" disabled={!userSignUp} onClick={signUpHandler}>
						Theater Sign Up
					</button>
				</div>
				{userSignUp ? <UserSignUp /> : <TheaterSignUp />}
			</div>
		</div>
	);
}
