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

    const loggedIn = window.localStorage.getItem("loggedIn");
    const displayNameJSON = window.localStorage.getItem("displayName");
    let displayName
    if (displayNameJSON) {
        displayName = JSON.parse(displayNameJSON)
    }


    return (
        <div>
            {
                loggedIn ?
                    <div className="ui secondary pointing menu header">
                        <div className="left-menu">
                            <a href="/" className="logo item">
                                <Image src="../logo.png" className="logo-image" />
                                On Stage
                            </a>
                            <a href='/performance_search' className="item">
                                Performances
                            </a>
                            <a href="/audtion_search" className="item">
                                Auditions
                            </a>
                            {!window.localStorage.getItem("TheaterCompany") ?
                                <a href="/saved_theaters" className="item">Saved Theater</a>
                                : null}
                            <a href="/profile" className="item">Profile</a>
                        </div>

                        <div className="right menu">
                            <div className="logged-In-Header">
                                <Button onClick={onLogout}>Sign Out</Button>
                            </div>


        <div className="ui secondary pointing menu header">
            <a href="/" className="item logo">
                <Image src="../logo.png" className="header-logo" />
                <span className="cursive-logo">On Stage</span>
            </a>
            <a href='/performance_search' className="item">
                    Performances

                </a>
                <a href="/audtion_search" className="item">
                    Auditions
                </a>
                {
                    user ? <a href="/saved_theaters" className="item">Saved Theaters</a> : null
                }
                
                <div className="right menu">
                    {user ?
                        <div className="logged-In-Header">
                            <span>Welcome, {user?.displayName}</span>
                            <Button onClick={() => { console.log('logged out'); auth.signOut(); window.localStorage.removeItem("TheaterCompany") }}>Sign Out</Button>

                        </div>
                    </div>
                    :
                    <div className="ui secondary pointing menu header">
                        <div className="left-menu">
                            <a href="/" className="logo item">
                                <Image src="../logo.png" className="logo-image" />
                                On Stage
                            </a>
                            <a href='/performance_search' className="item">
                                Theater Search
                            </a>
                            <a href="/audtion_search" className="item">
                                Auditions
                            </a>
                        </div>

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