
import firebase from "firebase";
import { ReactChild, ReactFragment, ReactPortal, useContext, useEffect, useMemo, useState } from "react";

import { Header } from "../../Components/header/Header";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";


type theaterType = {
    name: string;
    phone?: string;
    website?: string;
    zipcode?: string;
    theater_uid: string;
}
export function SavedTheaterView() {
    // user
    const { user } = useContext(AuthContext);
    const [savedTheaters, setSavedTheaters] = useState<any>([])
    const [reloaded, setRealoaded] = useState<number>(0)



    // set the data to saved movie state
    useEffect(() => {
        async function getData() {
            const savedTheaters = await db.collection('users').doc(user?.uid).get()
                .then(doc => doc.data())
            setSavedTheaters(savedTheaters?.connectedTheaters)
        }
        getData();


    }, [user, setSavedTheaters])

   const handleDisconnect = async ( theater: theaterType) => {
       const userID = user?.uid; 
       const usercollection = db.collection('users').doc(userID)

        await usercollection.update({
            connectedTheaters: firebase.firestore.FieldValue.arrayRemove(theater)
        })
        const updatedTheaters = savedTheaters.filter((theaterObj : theaterType)  => theaterObj.name != theater.name)

        // console.log(updatedTheaters)
        setSavedTheaters(updatedTheaters)

   }

    return (
        <>
            <Header />

            Saved Theaters

            <div>
                {savedTheaters ?
                    savedTheaters?.map((theater: theaterType) => {

                        return (
                            <div className="theater-box">
                                <h1>{theater?.name}</h1>
                                <ul>
                                    <li>{theater?.phone}</li>
                                    <li>{theater?.website}</li>
                                    <li>{theater?.zipcode}</li>
                                </ul>
                                <button onClick={() => handleDisconnect(theater)}>Disconnect</button>
                            </div>
                        )
                    }) : <div>No connected theater</div>
                }
            </div>

        </>
    )
}