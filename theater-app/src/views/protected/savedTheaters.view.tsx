
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
    const user = useContext(AuthContext);
    const [savedTheaters, setSavedTheaters ] = useState<any>([])
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



    return (
        <>
            <Header />

            Saved Theaters

            <div>
                { savedTheaters  ? 
                    savedTheaters?.map((theater: theaterType) => {
                        
                        return (
                            <div className="theater-box">
                                <h1>{theater?.name}</h1>
                                <ul>
                                    <li>{theater?.phone}</li>
                                    <li>{theater?.website}</li>
                                    <li>{theater?.zipcode}</li>
                                </ul>
                            </div>
                        )
                    }) : <div>No connected theater</div>
                }
            </div>

        </>
    )
}