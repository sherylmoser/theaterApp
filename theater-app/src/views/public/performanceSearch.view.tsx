import { deepStrictEqual } from "assert";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Header } from "../../Components/header/Header";
import { dbTheaters } from '../../firebase'


export function PerformanceSearch() {
    const users = [dbTheaters];


    
    return (
        <div>
            <Header /> 
            {/* input field  */}

            Performance Search
            {/* Cards for the performances  */}
        </div>
    )
}