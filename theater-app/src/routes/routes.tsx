// react imports
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { ReactNode, useContext } from 'react';

import { AuthContext } from '../context/AuthContext';

// views
import { LoginView } from '../views/public/login.view'
import SignupView from '../views/public/signup.view';
import { NotFound404 } from '../views/public/NotFound404'
import { PerformanceSearch } from '../views/public/performanceSearch.view'
import { AuditionSearchView } from '../views/public/auditionSearch.view'
import { SavedTheaterView } from '../views/protected/savedTheaters.view'
import { HomeView } from '../views/public/home.view'
import { ProfileView } from '../views/protected/profile.view';


type ProtectedViewProps = {
    children: ReactNode
}


export function ProtectedView({ children }: ProtectedViewProps) {
    const user = useContext(AuthContext);
    const navigate = useNavigate();
    if (!user) {
        navigate('/login')
    }
    return <>{children}</>

}

export function PublicView(props: any) {
    const { stuff } = props
    return (
        <div>
            {stuff}
        </div>
    )
}

export function MainRoutes() {
    const user = useContext(AuthContext);

    return (
        <div>
            <Routes>

                <Route path='/' element={<HomeView />} />

                <Route path='/audtion_search'>
                    <Route path=':id' element={<AuditionSearchView />} />
                    <Route path='' element={<AuditionSearchView />} />
                </Route>
                <Route path='/performance_search'>
                    <Route path=':id' element={<PerformanceSearch />} />
                    <Route path='' element={<PerformanceSearch />} />
                </Route>
                <Route path="/saved_theaters" >

                    <Route path=":id" element={<ProtectedView><SavedTheaterView /></ProtectedView>} />
                    <Route path="" element={<ProtectedView><SavedTheaterView /></ProtectedView>} />

                </Route>
                <Route path="/profile" element={<ProtectedView><ProfileView /></ProtectedView>} />

                <Route path="/login" element={<LoginView />} />
                <Route path="/sign_up" element={<SignupView />} />
                <Route path="*" element={<NotFound404 />} />

            </Routes>
        </div>
    )
}