
import firebase from "firebase";
import { useContext, useEffect, useState } from "react";
import { db } from '../../firebase'
import { Button, Loader } from 'semantic-ui-react'
import '../../styles/performancesView.css'
import '../../styles/theaterCard.css'
import { AuthContext } from "../../context/AuthContext";


export function AuditionSearchView() {

    type theaterType = {
        name: string;
        phone?: string;
        website?: string;
        zipcode?: string;
        theater_uid: string;
    }
    type auditionType = {
        address: string;
        callbacks: string;
        dates: string;
        image: string;
        signUp: string;
        theater_name: string;
        theater_uid: string;
        title: string;
    }

    const [search, setSearch] = useState<string>('');
    const [theatersState, setTheaterState] = useState<any>('');
    const { user } = useContext(AuthContext)

    // get the search
    const handleSearch = ({ target: { value } }: any) => {
        setSearch(value)
    }

    let theatersToReturn = async () => {
        // lowercase the search
        const loweredSearch = search.toLocaleLowerCase()

        // grab the theaters from firebase
        const auditions = (await db.collection('upcomingAuditions').get()).docs.map(doc => doc.data())
        if (!search) {
            // all of the theaters
            return auditions
        }
        else {
            // filtered auditions
            return auditions.filter((audition) => JSON.stringify(Object.values(audition)).toLocaleLowerCase().includes(loweredSearch))
        }
    }

    useEffect(() => {
        theatersToReturn().then(e => { setTheaterState(e); })
    }, [search]);

    const handleSave = async (theater: theaterType | string) => {

        const userID = user?.uid;

        let newTheater;

        if (typeof theater == 'string') {
            // get the data from server
            newTheater = await db.collection('theaters').doc(theater).get()
                .then(doc => doc.data())
        } else {
            newTheater = theater
        }

        let usercollection = db.collection('users').doc(userID);

        usercollection.update({
            connectedTheaters: firebase.firestore.FieldValue.arrayUnion(newTheater)
        })

    }

    return (
        <div className="performanceView-main-con">
            <div className="performance-body">
                <h2 className="performance-title">Audition Search</h2>
                <div className="search-bar">
                    <div className="ui search">
                        <div className="ui icon input">
                            <input className="prompt" type="text" onChange={handleSearch} placeholder="Audtions..." />
                            <i className="search icon"></i>
                        </div>
                    </div>

                </div>
                <div className="search-results">
                    {
                        theatersState != '' ?
                            theatersState.map((e: auditionType) => {

                                return (
                                    <div key={e.theater_uid} className="theater-card">
                                        <h2>{e.title}</h2>
                                        <img src={e.image} />
                                        <h3>{e?.theater_name}</h3>
                                        <div className="date-address-div">
                                            <p className="date">{e?.dates}</p>
                                            <p>{e?.address}</p>
                                            <p>Callbacks on {e?.callbacks}</p>
                                        </div>
                                        <a target="_blank" href={e?.signUp}>Sign Up</a>
                                        {window.localStorage.getItem("loggedIn") ?
                                            <Button className="connect-button" onClick={() => {
                                                handleSave(e.theater_uid)
                                            }}>Save Theater</Button>
                                            : null}


                                    </div>
                                )
                            }) : search.length == 0 ? <Loader active inline /> : <div>No Results Found</div>
                    }
                </div>

            </div>
        </div>
    )
}

