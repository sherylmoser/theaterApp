import { deepStrictEqual } from "assert";
import { ChangeEvent, ChangeEventHandler, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";
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


export function PerformanceSearch() {
    const [search, setSearch] = useState<string>('');
    const [theatersState, setTheaterState ] = useState<any>('');
    const user = useContext(AuthContext);

    // get the search
    const handleSearch = ({ target: { value } }: any) => {
        setSearch(value)
    }
    //  async container 
    let theatersToReturn = async () => {
        // lowercase the search
        const loweredSearch = search.toLocaleLowerCase()

        // grab the theaters from firebase
        const theaters = await (await db.collection('theaters').get()).docs.map(doc => doc.data())


        if(!search){
            // all of the theaters
            return theaters
        }
        else {
            // filtered theaters 
            return  theaters.filter((theater) => JSON.stringify(Object.values(theater)).toLocaleLowerCase().includes(loweredSearch))
        }
       
    }

    useEffect(() => {
        theatersToReturn().then(e => { setTheaterState(e);})

    }, [search]);

    
    function handleSave(theater:string){
        console.log(user, 'user');
        console.log(theater, 'theater');
        


    }

    return (
        <div className="performanceView-main-con">
            <Header /> 
            <div className="performance-body">
                <h2>Theater Search</h2>
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
                    theatersState.map((e : theaterType) => {
                        return (
                            <div key={e.theater_uid}className="theater-card">
                                <h2>{e.name}</h2>
                                <ul>
                                    <li>{e.phone}</li>
                                    <li>{e.website}</li>
                                    <li>{e.zipcode}</li>
                                    <li>{e.theater_uid}</li>
                                    <button onClick={ () => {
                                        handleSave(e.theater_uid)
                                    }}>Save Theater</button>
                                </ul>

                            </div>
                        )
                    }) : <Loader active inline />
                }
            </div>
        </div>
    )
}