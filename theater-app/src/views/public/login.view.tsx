import { Header } from "../../Components/header/Header";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { auth, db } from '../../firebase';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import '../../styles/signup.view.css';



export function LoginView() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState<string | ''>('');

    const { user, onLogin } = useContext(AuthContext)

    const nav = useNavigate();

    async function submitHandler(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        onLogin?.(email, password)
    }
    useEffect(() => {
        if (user) {
            nav('/');
        }
    }, [user])

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
                <span>Login</span>
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

