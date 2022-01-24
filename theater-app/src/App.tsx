import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { auth, dbUsers } from './firebase';
import './styles/App.css';
import SignupView from './views/public/signup.view';

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
      {!user ? <SignupView /> : <h1>Hello you are logged in</h1>}
      <button onClick={signOutHandler}>Sign out</button>
      <button onClick={addTheaterHandler}>Add</button>
    </div>
  );
}

export default App;
