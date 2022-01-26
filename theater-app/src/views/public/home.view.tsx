
import { Container } from "semantic-ui-react";

// components   
import { Header } from '../../Components/header/Header'


export function HomeView() {

    return (
        <>
            <Header />
            <Container className="home-logo">
                <h1>Welcome to On Stage!</h1>
            </Container>
            <Container className="home-info">
                <p>Connection is critical. Here at On Stage, we strive to make connection as simple as possible.
                    We know the struggle that performers have of trying to find auditions happening near them,
                    and so we have created a single place to have location-based searching for upcoming auditions and performaces.
                </p>
            </Container>
        </>
    )
}