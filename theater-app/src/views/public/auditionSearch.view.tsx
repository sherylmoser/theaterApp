

import { useEffect, useState } from "react";
import { Header } from "../../Components/header/Header";

import { db } from '../../firebase'
import { Loader } from 'semantic-ui-react'


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

    return (
        <div className="performanceView-main-con">
            <div className="performance-body">
                <h2>Audition Search</h2>
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
                        theatersState.map((e : auditionType) => {
                        
                            return (
                                <div key={e.theater_uid}className="theater-card">
                                    <h2>{e.title}</h2>
                                    <img src={e.image}/>
                                    <p>{e?.title}</p>
                                    <p>{e?.theater_name}</p>
                                    
                                        <p className="date">{e?.dates}</p>
                                        <p>{e?.address}</p>
                                        <p>{e?.callbacks}</p>
                                        <a target="_blank" href={e?.signUp}>Sign Up</a>
                                    
                                </div>
                            )
                        }) : search.length == 0 ? <Loader active inline /> : <div>No Results Found</div>
                    }
                </div>

            </div>
        </div>
    )
}

