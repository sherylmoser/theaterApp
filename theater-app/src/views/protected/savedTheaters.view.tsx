import { useContext, useEffect, useState } from "react";
import { Header } from "../../Components/header/Header";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";

export function SavedTheaterView() {
    // user
    const user = useContext(AuthContext);
    const [savedTheaters, setSavedTheaters ] = useState<any>()

    // // grab all of the users saved theaters
    const userSavedTheaters = async () => {
        let userCollection =  db.collection('users').doc(user?.uid)

         userCollection.get().then((doc) => {
            if (doc.exists){
                const data =  doc.data()
                setSavedTheaters(data)

            } else {
                console.log('not found')
            }
        }).catch((err) => console.log(err))

    }
    // userSavedTheaters()

    // useEffect(() => {
    //   console.log(savedTheaters)
    // }, []);
    
    // console.log(userSavedTheaters())
    // console.log(user?.uid)
    return (
        <>
            <Header />

            Saved Theaters
        </>
    )
}