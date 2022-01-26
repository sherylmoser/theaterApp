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

    // const theaters = async () => {
    //     const snap = await db.collection('theaters').get()
    //     console.log(snap.docs.map(doc => doc.data()))
    //     return snap.docs.map(doc => doc.data())
    // }

    return (
            <div className="ui secondary pointing menu header">
                <a href="/">
                    <Image src="../logo.png" className="header-logo" />
                </a>
                <a href='/performance_search' className="item">
                    Theater Search
                </a>
                <a href="/audtion_search" className="item">
                    Auditions
                </a>
                {
                    user ? <a href="/saved_theaters" className="item">Saved Theater</a> : null
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