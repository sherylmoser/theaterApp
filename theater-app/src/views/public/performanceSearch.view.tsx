import { deepStrictEqual } from "assert";

import firebase from "firebase";

import { useContext, useEffect, useState } from "react";
import { Header } from "../../Components/header/Header";
import { AuthContext } from "../../context/AuthContext";
import { db } from '../../firebase'
import { Loader } from 'semantic-ui-react'


type theaterType = {
    name: string;
    phone?: string;
    website?: string;
    zipcode?: string; 
    theater_uid: string; 
}
type performanceType = {
    address:string; 
    buyTickets: string;
    dates: string; 
    image: string;
    theater_uid: string;
    title: string; 
    theater_name: string; 
}

export function PerformanceSearch() {
    const [search, setSearch] = useState<string>('');
    const [theatersState, setTheaterState ] = useState<any>('');
    const user = useContext(AuthContext);
    const [pushTheater, setPushTheater] = useState<theaterType>()
    // get the search
    const handleSearch = ({ target: { value } }: any) => {
        setSearch(value)
    }
    //  async container 
    const saveTheater = async (theaterUID : string) => {
        // grab the theater from the theaters collection
        
    }

    let theatersToReturn = async () => {
        // lowercase the search
        const loweredSearch = search.toLocaleLowerCase()

        // grab the theaters from firebase
        // const theaters = (await db.collection('theaters').get()).docs.map(doc => doc.data())
        const performances = (await db.collection('upcomingPerformances').get()).docs.map(doc => doc.data())
        if(!search){
            // all of the theaters
            // return theaters
            return performances
        }
        else {
            // filtered theaters 
            return  performances.filter((theater) => JSON.stringify(Object.values(theater)).toLocaleLowerCase().includes(loweredSearch))
            // return  theaters.filter((theater) => JSON.stringify(Object.values(theater)).toLocaleLowerCase().includes(loweredSearch))
        }
       
    }

    useEffect(() => {
        theatersToReturn().then(e => { setTheaterState(e);})

    }, [search]);

    

    const handleSave =  async (theater:theaterType  |  string ) => {

        const userID = user?.uid; 
        let newTheater; 
        
        if(typeof theater == 'string'){
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
            <Header /> 
            <div className="performance-body">
                <h2>Performance Search</h2>
                <div >
                    <div className="ui search">
                        <div className="ui icon input">
                            <input className="prompt" type="text" onChange={handleSearch} placeholder="Theaters..." />
                            <i className="search icon"></i>
                        </div>
                        <div className="results">
                           
                        </div>
                    </div>
                </div>  
                
                {
                    theatersState != '' ? 
                    theatersState.map((e : performanceType) => {
                        return (
                            <div key={e.theater_uid}className="theater-card">
                                <h2>{e.title}</h2>
                                <img src={e.image}/>
                                <ul>
                                    <li>{e?.dates}</li>
                                    <li>{e?.address}</li>
                                    <li>{e?.buyTickets}</li>
                                </ul>
                                <div> 
                                    <p>{e?.theater_name}</p>
                                    <button onClick={ () => {
                                        handleSave(e?.theater_uid)
                                    }}>Connect to Theater</button>
                                </div>
                            </div>
                        )
                    }) : <Loader active inline />
                    // theatersState != '' ? 
                    // theatersState.map((e : theaterType) => {
                    //     return (
                    //         <div key={e.theater_uid}className="theater-card">
                    //             <h2>{e.name}</h2>
                    //             <ul>
                    //                 <li>{e.phone}</li>
                    //                 <li>{e.website}</li>
                    //                 <li>{e.zipcode}</li>
                    //                 <li>{e.theater_uid}</li>
                    //                 <button onClick={ () => {

                    //                     handleSave(e)
                                        

                    //                 }}>Save Theater</button>
                    //             </ul>

                    //         </div>
                    //     )
                    // }) : <Loader active inline />
                }
            </div>
        </div>
    )
}