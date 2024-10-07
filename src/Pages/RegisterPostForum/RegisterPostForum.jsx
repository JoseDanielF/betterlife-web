import React, { useState, useEffect } from 'react';
import Styles from './RegisterPostForum.module.css';
import Header from '../Header/Header';
import dadosUserLogadoService from '../../Services/DadosUserLogado/DadosUserLogado-service';
import forumService from '../../Services/Forum/Forum-service';
import { useNavigate } from 'react-router-dom';
import categoriaForumService from '../../Services/CategoriaForum/CategoriaForum-service';
import Footer from '../Footer/Footer';

const RegisterPostForum = () => {
    const navigate = useNavigate();
    const [usuarioIdPergunta, setUsuarioIdPergunta] = useState('');
    const [pergunta, setPergunta] = useState('');

    const [categoriaForumId, setCategoriaForumId] = useState('1'); // Valor inicial pode ser o ID de uma categoria padrão
    const [categorias, setCategorias] = useState([]);

    const listarCategorias = async () => {
        try {
            const response = await categoriaForumService.listarCategoriasForum();

            if (response.error === false) {
                setCategorias(response.data);
            } else {
                alert(response.message);
            }
        } catch (error) {
            alert(error.message || 'Erro ao listar taxonomias');
        }
    }

    const handleBack = () => {
        navigate('/telaPrincipal');
    };


    useEffect(() => {
        const userId = dadosUserLogadoService.getUserInfo().id;
        setUsuarioIdPergunta(userId);
        listarCategorias();
    }, []);

    const submeter = async (e) => {
        e.preventDefault();
        if (!pergunta || !categoriaForumId) {
            alert('Todos os campos do post são obrigatórios.');
            return;
        }
        try {
            const post = {
                usuarioidpergunta: usuarioIdPergunta,
                pergunta: pergunta,
                categoriaforumid: categoriaForumId
            };
            const response = await forumService.registerPost(JSON.stringify(post));
            if (response.error === false) {
                alert('Post enviado');
                setTimeout(() => {
                    navigate('/meusPosts');
                }, 2000);
                setUsuarioIdPergunta('');
                setPergunta('');
                setCategoriaForumId('1');
            }

        } catch (error) {
            alert(error.message || 'Erro ao realizar post no forum');
        }
    };

    return (
        <>
            <Header />
            <div className={Styles.ConteudoContainer}>
                <h1>Criar Post</h1>
                <div className={Styles.container}>
                    <form onSubmit={submeter}>
                        <div className={Styles.formGroup}>
                            <label htmlFor="pergunta">Pergunta:</label>
                            <textarea
                                id="pergunta"
                                rows="5"
                                value={pergunta}
                                onChange={(e) => setPergunta(e.target.value)}
                                required
                            />
                        </div>

                        <div className={Styles.formGroup}>
                            <label htmlFor="categoriaForumId">Categoria:</label>
                            <select
                                id="categoriaForumId"
                                value={categoriaForumId}
                                onChange={(e) => setCategoriaForumId(e.target.value)}
                                required
                            >
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={Styles.buttonContainer}>
                            <button type="button" className={Styles.VoltarButton} onClick={handleBack}>
                                Voltar
                            </button>
                            <button type="submit" className={Styles.PostButton}>Publicar</button>
                        </div>
                    </form>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default RegisterPostForum