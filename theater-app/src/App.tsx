import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { auth, dbUsers } from './firebase';
import { MainRoutes } from './routes/routes';
import './styles/App.css';
import SignupView from './views/public/signup.view';

function App() {

  return (
    <div className="App">
      <MainRoutes />
    
    </div>
  );
}

export default App;
