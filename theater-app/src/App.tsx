import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { auth, dbUsers } from './firebase';
import { MainRoutes } from './routes/routes';
import './styles/App.css';


function App() {

  return (
    <div className="App">
      <MainRoutes />
    </div>
  );
}

export default App;
