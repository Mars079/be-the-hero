import React, { useState } from 'react';
import api from '../../services/api'
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('/sessions', { id });
            localStorage.setItem('ongID', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert("Falha no login");
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the hero icon"/>

                <form onSubmit={handleLogin}>
                    <h1> Faça seu logon </h1>

                    <input 
                     type="text"
                     placeholder="Sua ID"
                     onChange={e => setId(e.target.value)}
                     />

                    <button type="submit" className="button"> Entrar </button>
                    
                    <Link className="push-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>            
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}