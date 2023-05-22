import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import PersonalizePage from './pages/Personalize';
import ProfilePage from './pages/Profile';

interface IAppProps {};
 
const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <Routes>
      <Route path='/' element={<HomePage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/personalize' element={<PersonalizePage/>} />
      <Route path='/profile' element={<ProfilePage/>} />
    </Routes>
  );
}
 
export default App;