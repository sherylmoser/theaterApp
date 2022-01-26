import { Header } from "../../Components/header/Header";
import { TheaterProfile } from "../../Components/theaterProfile/theaterProfile";
import { UserProfile } from "../../Components/userProfile/userProfile";

export function ProfileView() {
    const theaterUser = window.localStorage.getItem("TheaterCompany")
    return (
        <>
            <Header />
            {theaterUser ? <TheaterProfile /> : <UserProfile />}
        </>
    )
}