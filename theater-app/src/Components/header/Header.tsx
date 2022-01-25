import { Button, Menu, Image } from "semantic-ui-react"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { auth, db } from '../../firebase';
import { useNavigate } from "react-router-dom";
import { dbTheaters } from "../../firebase";
import { ScriptSnapshot } from "typescript";

// CSS Import
import './Header.css'


// async function name(params:type) {
//     const snap = await firebase.fireStore().collection('events').get()
//     return ScriptSnapshot.docs.map(doc => doc.data())

// }
export function Header() {
    const user = useContext(AuthContext);
    const nav = useNavigate();

    const theaters = async () => {
        const snap = await db.collection('theaters').get()
        console.log(snap.docs.map(doc => doc.data()))
        return snap.docs.map(doc => doc.data())
    }



    return (
        <div className="menu-container">
            <div className="ui secondary pointing menu">
                <a href="/" className="item">
                    <Image src="../logo.png" className="header-logo" />
                </a>
                <a href='/performance_search' className="item">
                    Performances
                </a>
                <a href="/audtion_search" className="item">
                    Auditions
                </a>
                <div className="right menu">
                    {user ?
                        <div>
                            <span>Welcome, {user?.displayName}</span>
                            <Button onClick={() => { console.log('logged out'); auth.signOut()}}>Sign Out</Button>
                        </div> 
                        : 

                        <div>
                            <Button onClick={() => { console.log('Logged in'); theaters(); nav('/login');}}>Login</Button>
                            <Button onClick={() => {console.log('Sign up '); nav('/sign_up')}}>Sign up</Button>

                        </div>}
                </div>
            </div>
        </div>
    )
}