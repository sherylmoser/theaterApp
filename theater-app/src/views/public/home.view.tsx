
import { Container, Image } from "semantic-ui-react";

import { useContext, useEffect } from "react"
// import { AuthContext } from "../../context/AuthContext";

// components   
import { Header } from '../../Components/header/Header'
import '../../styles/home.view.css'

export function HomeView() {


    return (
        <>
            <Header />
            <div className="bg-image">
                <h1>Welcome to On Stage!</h1>
                <p>Connection is critical. Here at On Stage, we strive to make connection as simple as possible.
                    We know the struggle that performers have of trying to find auditions happening near them,
                    and so we have created a single place to have location-based searching for upcoming auditions and performaces.
                </p>
            </div>
        </>
    )
}