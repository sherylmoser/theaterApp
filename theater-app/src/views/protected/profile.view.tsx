import { useContext } from "react";
import { Header } from "../../Components/header/Header";
import { TheaterProfile } from "../../Components/theaterProfile/theaterProfile";
import { UserProfile } from "../../Components/userProfile/userProfile";
import { AuthContext } from "../../context/AuthContext";

export function ProfileView() {
    const user = useContext(AuthContext)
    const theaterUser = window.localStorage.getItem("TheaterCompany")
    return (
        <>
            <Header />
        </>
    )
}