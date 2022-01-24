import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { auth, dbUsers } from './firebase';
import { MainRoutes } from './routes/routes';
import './styles/App.css';

function App() {

  const user = useContext(AuthContext);

  function signOutHandler() {
    auth.signOut()
  }
  function addTheaterHandler() {
    dbUsers.doc(user?.uid)
      .update({
        connectedTheaters: 'test'
      })
  }
  return (
    <div className="App">
      <MainRoutes />
    </div>
  );
}

export default App;
