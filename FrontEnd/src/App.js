import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';

import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Sample from './Components/Sample';



function App() {
 
  let isAuthenticated = () => {
    return sessionStorage.getItem('auth') === 'true';
  };
  let ProtectedRoute = ({ element }) => {
    return isAuthenticated() ? element :<Navigate to="/"/>;
  };
  return (
    <div>
       {/* <Sample /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
