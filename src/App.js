import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
//Pages
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import RecuperarSenha from './Pages/RecuperarSenha/RecuperarSenha';
import TelaPrincipal from './Pages/TelaPrincipal/TelaPrincipal';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/telaPrincipal' element={<TelaPrincipal/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/recuperarSenha' element={<RecuperarSenha />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
