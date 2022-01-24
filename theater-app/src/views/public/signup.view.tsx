
import { ChangeEvent, useContext, useState } from 'react';
import { auth } from '../../firebase';
import firebase from 'firebase';
import { Header } from '../../Components/header/Header';
import { useState } from "react";
import TheaterSignUp from "../../Components/theaterSignUp/TheaterSignUp";
import UserSignUp from "../../Components/userSignUp/UserSignUp";


export default function SignupView() {
	const [ userSignUp, setUserSignUp ] = useState<boolean>(true)

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
			<form onSubmit={submitHandler}>
				<input required onChange={emailHandler} value={email} type="email" placeholder='Email' />
				<input required onChange={passwordHandler} value={password} type="password" placeholder='Password' />
				<input required onChange={nameHandler} value={name} type="text" placeholder='Name' />
				<input type="text" onChange={zipCodeHandler} value={zipCode} placeholder='Zip Code'/>
				<input type="submit" value="Sign Up" />
			</form>

		
	);
}
