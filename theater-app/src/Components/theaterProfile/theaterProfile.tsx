import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { db } from "../../firebase";

type AuditionsType = {
    title?: string;
    dates?: string;
    callbacks?: string;
    image?: string;
    address?: string;
    signUp?: string;
}

type PerformancesType = {
    title?: string;
    dates?: string;
    image?: string;
    address?: string;
    buyTickets?: string;
}

type TheaterType = {
    name?: string;
    email?: string;
    phone?: string;
    website?: string;
    zipCode?: string;
    theater_uid?: string;
    upcomingAuditions?: AuditionsType[];
    upcomingPerformances?: PerformancesType[];
}


export function TheaterProfile() {

    const [theaterInfo, setTheaterInfo] = useState<TheaterType>()

    const user = useContext(AuthContext)
    const uid = user?.uid;
    // console.log("User UID", uid);

    let theaterData: TheaterType | undefined;
    let docRef = db.collection("theaters").doc(uid)

    useEffect(() => {
        async function getdata() {
            const theaterObject = await docRef.get().then(doc => {
                // console.log("docref data", doc.data())
                theaterData = { ...doc.data() };
            }).catch(error => {
                console.log(error)
            })
            setTheaterInfo({
                ...theaterData
            })
        }
        getdata()
    }, [user, setTheaterInfo])

    console.log("Theater Name", theaterInfo?.name)


    return (
        <div>
            <h1>Theater Profile</h1>
        </div>
    )
}