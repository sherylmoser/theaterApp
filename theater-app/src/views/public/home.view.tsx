import { useContext, useEffect } from "react"
import { AuthContext } from "../../context/AuthContext";

// components   
import { Header } from '../../Components/header/Header'

export function HomeView() {
    const user = useContext(AuthContext);
    

    useEffect(() => {
      
    }, [user]);
    
    return (
        <div>
           <Header />
        </div>
    )
}