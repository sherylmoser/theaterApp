import { deepStrictEqual } from "assert";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { couldStartTrivia } from "typescript";
import { Header } from "../../Components/header/Header";
import { db } from '../../firebase'

{/* email: "lacinfo@lehicityarts.org"
name: "Lehi Arts Council"
phone: "801-341-8299"
theater_uid: "2sImHvsEyLDXxre6pHrq"
website: "https://www.lehicityarts.org"
zipcode: "84043" */}

type theaterType = {
    name: string;
    phone?: string;
    website?: string;
    zipcode?: string; 
    theater_uid?: string; 
}

export function PerformanceSearch() {
    const [search, setSearch] = useState<string>('');
    const [theatersState, setTheaterState ] = useState<any>('')
    // get the search
    const handleSearch = ({ target: { value } }: any) => {
        setSearch(value)
    }
    
    //  async container 
    let theatersToReturn = async () => {
        const loweredSearch = search.toLocaleLowerCase()

        const theaters = await (await db.collection('theaters').get()).docs.map(doc => doc.data())


        if(!search){
            // setTheaterState(theaters)
            return theaters
        }
        else {
            // filter out the ones that dont match 
            // setTheaterState(theaters.filter((theater) => JSON.stringify(Object.values(theater)).toLocaleLowerCase().includes(loweredSearch)))
            return  theaters.filter((theater) => JSON.stringify(Object.values(theater)).toLocaleLowerCase().includes(loweredSearch))
        }
       
    }

    useEffect(() => {
        // console.log(search)
        theatersToReturn().then(e => { setTheaterState(e);})
        // console.log(theatersState, 'state changed')
        

    }, [search]);

    // theatersToReturn('@').then(e => setTheaterState(e))
    // setSearch('orem')
    // setTheaterState('yeet')
    
    
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
                                </ul>
                            </div>
                        )
                    }) : <div>No results </div>
                }
            </div>
            {/* input field  */}
            
            
            
        </div>
    )
}