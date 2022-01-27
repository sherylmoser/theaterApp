
import firebase from "firebase";
import { ReactChild, ReactFragment, ReactPortal, useContext, useEffect, useMemo, useState } from "react";
import { Button } from "semantic-ui-react";

import { Header } from "../../Components/header/Header";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";

import '../../styles/savedTheaters.css'
import '../../styles/theaterCard.css'

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

    const handleDisconnect = async (theater: theaterType) => {
        const userID = user?.uid;
        const usercollection = db.collection('users').doc(userID)

        await usercollection.update({
            connectedTheaters: firebase.firestore.FieldValue.arrayRemove(theater)
        })
        const updatedTheaters = savedTheaters.filter((theaterObj: theaterType) => theaterObj.name != theater.name)

        // console.log(updatedTheaters)
        setSavedTheaters(updatedTheaters)

    }

    return (
        <>
            <div className="saved-view">
                <h1 className="saved-title">Saved Theaters</h1>
                <div className="saved-body">
                    {savedTheaters ?
                        savedTheaters?.map((theater: theaterType) => {
                            return (
                                <div className="theater-card saved-theater">
                                    <h2>{theater?.name}</h2>
                                    <div className="date-address-div">
                                        <p>{theater?.phone}</p>
                                        <p>{theater?.website}</p>
                                        <p>{theater?.zipcode}</p>
                                    </div>
                                    <Button className="connect-button" onClick={() => handleDisconnect(theater)}>Disconnect</Button>
                                </div>
                            )
                        }) : <div>No connected theater</div>
                    }
                </div>
            </div>

        </>
    )
}