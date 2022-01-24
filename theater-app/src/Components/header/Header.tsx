import { Button, Menu } from "semantic-ui-react"
import { useContext} from "react";
import { AuthContext } from "../../context/AuthContext";


export function Header() {
    const user = useContext(AuthContext);

    return (
        <div className="menu-container">
            <div className="ui secondary pointing menu">
                <a className="active item">
                    Home
                </a>
                <a className="item">
                   Performances
                </a>
                <a className="item">
                    Auditions 
                </a>
                <div className="right menu">
                    { user ? <a className="ui item"></a> : <Button>Login</Button>}
                </div>
            </div>
            <div className="ui segment">
                <p>On Stage</p>
            </div>
        </div> 
    )
}