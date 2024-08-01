import React, { useState } from 'react';
import Styles from '../PerfilUsuario/PerfilUsuario.module.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import {
  TextField, Grid, Paper
} from '@material-ui/core';
import usuarioService from '../../Services/Usuario/Usuario-service';
import dadosUserLogadoService from '../../Services/DadosUserLogado/DadosUserLogado-service';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    email: dadosUserLogadoService.getUserInfo().email,
    nome: dadosUserLogadoService.getUserInfo().nome,
    documento: dadosUserLogadoService.getUserInfo().documento,
    telefone: dadosUserLogadoService.getUserInfo().telefone,
  });
  const navigate = useNavigate();

  const alterarDados = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const editarDados = async (e) => {
    e.preventDefault();
    try {
      const response = await usuarioService.updateUser(JSON.stringify(formData), dadosUserLogadoService.getUserInfo().id);

      if (response.error === false) {
        alert('Usuário editado com sucesso!');
        await localStorage.setItem('userInfo', JSON.stringify(response.data));
        window.location.reload();
      }

    } catch (error) {
      alert(error.message || 'Erro ao editar usuário');
    }
  };

  const handleBack = () => {
    navigate('/telaPrincipal');
  };

  return (
    <div className={Styles.UserProfileContainer}>
      <Header />
      <Paper className={Styles.paper}>
        <h2 className={Styles.title}>Perfil do Usuário</h2>
        <form onSubmit={editarDados}>
          <div className={Styles.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  type="email"
                  name="email"
                  label={
                    <span>
                      E-mail <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  value={formData.email}
                  onChange={alterarDados}
                  fullWidth
                  id="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  type="nome"
                  name="nome"
                  label={
                    <span>
                      Nome <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  value={formData.nome}
                  onChange={alterarDados}
                  fullWidth
                  id="nome"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  type="documento"
                  name="documento"
                  label={
                    <span>
                      Documento <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  value={formData.documento}
                  onChange={alterarDados}
                  fullWidth
                  id="documento"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  type="telefone"
                  name="telefone"
                  label={
                    <span>
                      Telefone <span style={{ color: 'red' }}>*</span>
                    </span>
                  }
                  value={formData.telefone}
                  onChange={alterarDados}
                  fullWidth
                  id="telefone"
                />
              </Grid>
            </Grid>
          </div>
          <div className={Styles.buttonContainer}>
            <button type="submit" className={Styles.SaveButton}>Salvar</button>
            <button type="button" className={Styles.BackButton} onClick={handleBack}>Voltar</button>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default UserProfile;
