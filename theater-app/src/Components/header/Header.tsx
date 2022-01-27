import { Button, Image } from "semantic-ui-react"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

// CSS Import
import './Header.css'
import { ProtectedView } from "../../routes/routes";

export function Header() {
    const { user, onLogout } = useContext(AuthContext)
    const nav = useNavigate();
    const loggedIn = window.localStorage.getItem("loggedIn")

    return (
        <div>
            {
                loggedIn ?
                    <div className="ui secondary pointing menu header">
                        <Image src="../logo.png" className="logo-image" />
                        <a href="/" className="logo-text item">
                            On Stage
                        </a>
                        <a href='/performance_search' className="item">
                            Performances
                        </a>
                        <a href="/audtion_search" className="item">
                            Auditions
                        </a>
                        <a href="/saved_theaters" className="item">Saved Theater</a>
                        <a href="/profile" className="item">Profile</a>

                        <div className="right menu">
                            <div className="logged-In-Header">
                                <span>Welcome, {user?.displayName}</span>
                                <Button onClick={onLogout}>Sign Out</Button>
                            </div>

                        </div>
                    </div>
                    :
                    <div className="ui secondary pointing menu header">
                        <Image src="../logo.png" className="logo-image" />
                        <a href="/" className="logo-text item">
                            On Stage
                        </a>
                        <a href='/performance_search' className="item">
                            Theater Search
                        </a>
                        <a href="/audtion_search" className="item">
                            Auditions
                        </a>

                        <div className="right menu">

                            <div className="logged-In-Header">
                                <Button onClick={() => { nav('/login'); }}>Login</Button>
                                <Button onClick={() => { nav('/sign_up') }}>Sign up</Button>
                            </div>

                        </div>
                    </div>
            }
        </div>
    )
}