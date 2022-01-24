import { useState } from "react";
import TheaterSignUp from "../../Components/theaterSignUp/TheaterSignUp";
import UserSignUp from "../../Components/userSignUp/UserSignUp";

export default function SignupView() {
	const [ userSignUp, setUserSignUp ] = useState<boolean>(true)

	function signUpHandler() {
		setUserSignUp(!userSignUp)
	}
	
	return (
		<div>
			<button disabled={userSignUp} onClick={signUpHandler}>User Sign Up</button>
			<button disabled={!userSignUp} onClick={signUpHandler}>Theater Sign Up</button>
			{userSignUp ? <UserSignUp /> : <TheaterSignUp />}
		</div>
	);
}
