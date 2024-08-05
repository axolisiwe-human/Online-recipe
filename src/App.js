import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Registration from './pages/Registration'
import Login from '../src/pages/Login'
import NoPage from './pages/NoPage';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />
        <Route path ='/home' element={<Home/>} />
        <Route path ='/registration' element={<Registration/>} />
        <Route path ='/login' element={<Login/>} />
        <Route path='*' element={<NoPage/>}/>
      </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
