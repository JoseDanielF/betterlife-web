import React from 'react';
import { BrowserRouter, Route, Routes as RouterRoutes, Navigate  } from 'react-router-dom';
import dadosUserLogadoService from './Services/DadosUserLogado/DadosUserLogado-service';
//Pages
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import RecuperarSenha from './Pages/RecuperarSenha/RecuperarSenha';
import TelaPrincipal from './Pages/TelaPrincipal/TelaPrincipal';
import RedefinirSenha from './Pages/RedefinirSenha/RedefinirSenha';
import UserProfile from './Pages/PerfilUsuario/PerfilUsuario';
import Taxonomia from './Pages/Taxonomia/Taxonomia';
import RegisterAnimal from './Pages/RegisterAnimal/RegisterAnimal';

const PrivateRoute = ({ element, ...rest }) => {
    const isAuthenticated = dadosUserLogadoService.getUserInfo() !== null;
    return isAuthenticated ? element : <Navigate to="/login" replace />;
};

const PublicRoute = ({ element, ...rest }) => {
    const isAuthenticated = dadosUserLogadoService.getUserInfo() !== null;
    return !isAuthenticated ? element : <Navigate to="/telaPrincipal" replace />;
};

const Routes = () => (
    <BrowserRouter>
      <RouterRoutes>
        
        {/* Rotas públicas */}
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<PublicRoute element={<Login />} />} />
        <Route path='/register' element={<PublicRoute element={<Register />} />} />
        <Route path='/recuperarSenha' element={<PublicRoute element={<RecuperarSenha />} />} />
        <Route path='/redefinirSenha' element={<PublicRoute element={<RedefinirSenha />} />} />
        <Route path='/registerAnimal' element={<PublicRoute element={<RegisterAnimal/>} />} />
        
        {/* Rotas Privadas */}
        <Route path='/telaPrincipal' element={<PrivateRoute element={<TelaPrincipal />} />} />
        <Route path='/perfil' element={<PrivateRoute element={<UserProfile />} />} />
        <Route path='/taxonomia' element={<PrivateRoute element={<Taxonomia />} />} />
      </RouterRoutes>
    </BrowserRouter>
);

export default Routes;