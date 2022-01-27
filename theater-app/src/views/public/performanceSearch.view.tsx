
import firebase from "firebase";
import { useContext, useEffect, useState } from "react";
import { Header } from "../../Components/header/Header";
import { AuthContext } from "../../context/AuthContext";
import { db } from '../../firebase'
import { Button, Loader } from 'semantic-ui-react'
import '../../styles/performancesView.css'


type theaterType = {
    name: string;
    phone?: string;
    website?: string;
    zipcode?: string;
    theater_uid: string;
}
type performanceType = {
    address: string;
    buyTickets: string;

    startDate: string;
    endDate: string; 

    image: string;
    theater_uid: string;
    title: string;
    theater_name: string;
}

export function PerformanceSearch() {
    const [search, setSearch] = useState<string>('');

    const [theatersState, setTheaterState ] = useState<any>('');
    const {user} = useContext(AuthContext);

    const handleSearch = ({ target: { value } }: any) => {
        setSearch(value)
    }


    //  async container to get performances
    let performancesToReturn = async () => {
        // lowercase the search
        const loweredSearch = search.toLocaleLowerCase()

        // grab the theaters from firebase
        const performances = (await db.collection('upcomingPerformances').get()).docs.map(doc => doc.data())


        if(!search){

            return performances
        }
        else {
            // filtered theaters 

            return  performances.filter((theater) => JSON.stringify(Object.values(theater)).toLocaleLowerCase().includes(loweredSearch))

        }

    }

    useEffect(() => {


        performancesToReturn().then(e => { setTheaterState(e);})


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
                <h2>Performances Search</h2>
                <div className="search-bar">
                    <div className="ui search">
                        <div className="ui icon input">
                            <input className="prompt" type="text" onChange={handleSearch} placeholder="Theaters..." />
                            <i className="search icon"></i>
                        </div>

                    </div>
                </div>  
                <div className="search-results">

                
                {
                    theatersState != '' ? 
                    theatersState.map((e : performanceType) => {
                        return (
                            <div key={e.theater_uid} className="theater-card">
                                <h2>{e.title}</h2>
                                <img src={e.image}/>
                                <h3>{e?.theater_name}</h3>
                                <p className="date">{e?.startDate} - {e?.endDate}</p>
                                <p>{e?.address}</p>
                                <a target="_blank" href={e?.buyTickets}>Buy tickets</a>
                                <Button onClick={ () => {
                                    handleSave(e?.theater_uid)
                                }}>Connect to Theater</Button>
                            </div>
                        )


                        }) : search.length == 0 ? <Loader active inline /> : <div>No Results Found</div>

                }
                </div>
            </div>
        </div>
    )
}