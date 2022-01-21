// react imports
import { useGlobalContext } from '../contexts/global.context'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

// views
import { LoginView } from '../views/public/login.view'
import { SignupView } from '../views/public/signup.view'
import { NotFound404 } from '../views/public/NotFound404'
import { PerformanceSearch } from '../views/public/performanceSearch.view'
import { AuditionSearchView } from '../views/public/auditionSearch.view'
import { SavedTheaterView } from '../views/protected/savedTheaters.view'
import { HomeView } from '../views/public/home.view'

// Semantic Ui imports 
import { Header, Menu } from 'semantic-ui-react'



export function ProtectedView(props: any) {
    const { stuff } = props;

    return (
        <div>
            {stuff}
        </div>
    )
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
    const loggedIn = useGlobalContext()

    return (
        <div>
            {/* <Header />
             */}
            <div className="ui secondary  menu">
                <a className="active item">
                    Home
                </a>
                <a className="item">
                    Messages
                </a>
                <a className="item">
                    Friends
                </a>
                <div className="right menu">
                    <div className="item">
                        <div className="ui icon input">
                            {/* <input type="text" placeholder="Search..."> */}
                            <i className="search link icon"></i>
                        </div>
                    </div>
                    <a className="ui item">
                        Logout
                    </a>
                </div>
            </div>



            {loggedIn ? <ProtectedView /> : <PublicView />}


            <Routes>
                {/* <Route path='/' element={<HomeView />} */}
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
                    <Route path=":id" element={<ProtectedView> <SavedTheaterView /> </ProtectedView>} />
                    <Route path="" element={<ProtectedView> <SavedTheaterView /> </ProtectedView>} />
                </Route>

                <Route path="/login" element={<LoginView />} />
                <Route path="/sign-up" element={<SignupView />} />
                <Route path="*" element={<NotFound404 />} />

            </Routes>
        </div>

    )


}