import { Button, Menu, Image } from "semantic-ui-react"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth, db } from '../../firebase';
import { useNavigate } from "react-router-dom";
import { dbTheaters } from "../../firebase";
import { ScriptSnapshot } from "typescript";

// CSS Import
import './Header.css'

export function Header() {
    const user = useContext(AuthContext);
    const nav = useNavigate();


    return (


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
                        :

                        <div className="logged-In-Header">
                            <Button onClick={() => { nav('/login');}}>Login</Button>
                            <Button onClick={() => { nav('/sign_up')}}>Sign up</Button>
                        </div>
                        }
                </div>
            </div>
    )
}