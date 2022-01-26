// react imports
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

// views
import { LoginView } from '../views/public/login.view'
import SignupView from '../views/public/signup.view';
import { NotFound404 } from '../views/public/NotFound404'
import { PerformanceSearch } from '../views/public/performanceSearch.view'
import { AuditionSearchView } from '../views/public/auditionSearch.view'
import { SavedTheaterView } from '../views/protected/savedTheaters.view'
import { HomeView } from '../views/public/home.view'

// Semantic Ui imports 
import { Header, Menu } from 'semantic-ui-react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ProfileView } from '../views/protected/profile.view';




export function ProtectedView(props: any) {
    const { view } = props; 
    const user = useContext(AuthContext);
    
    if(!user) {
        return (
            null
        )
    } else {
        return (
            <div>
                {view}
            </div>
        )
    }


    
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
                <Route path='performance_search'>
                    <Route path=':id' element={<PerformanceSearch />} />
                    <Route path='' element={<PerformanceSearch />} />
                </Route>
                <Route path="/saved_theaters" >
                    <Route path=":id" element={<SavedTheaterView /> }/>
                    <Route path="" element={<SavedTheaterView /> } />
                </Route>
                <Route path="/profile" >
                    <Route path=":id" element={<ProtectedView> <ProfileView /> </ProtectedView>} />
                    <Route path="" element={<ProtectedView> <ProfileView /> </ProtectedView>} />
                </Route>

                <Route path="/login" element={<LoginView />} />
                <Route path="/sign_up" element={<SignupView />} />
                <Route path="*" element={<NotFound404 />} />

            </Routes>
        </div>
    )
}