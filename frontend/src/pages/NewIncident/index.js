import React, { useState } from 'react';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function NewIncident() {

    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    async function handleNewIncident(e) {
        e.preventDefault();

        const ongID = localStorage.getItem('ongID');
        const data = {
            title,
            description,
            value
        };

        try {
            api.post('incidents', data, {
                headers: {
                    auth: ongID,
                }
            })

            history.push('/profile');

        } catch (err) {
            alert("Não foi possivel cadastrar um novo caso. Tente novamente.")
        }
    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero icon"/>

                    <h1> Cadastrar novo caso </h1>
                    <p> Descreva o caso com as principais informações. </p>

                    <Link to="/profile" className="push-link">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para Home       
                    </Link> 
                </section>

                <form onSubmit={handleNewIncident}>
                    <input type="text" 
                      placeholder="Titulo do caso"
                      value={title}
                      onChange = {e => (setTitle(e.target.value))}
                    />
                    <textarea 
                      placeholder="Descrição"
                      value={description}
                      onChange = {e => (setDescription(e.target.value))}
                    />
                    <input type="text" 
                      placeholder="valor em reais"
                      value={value}
                      onChange = {e => (setValue(e.target.value))}
                    />

                    <button className="button" type="submit">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}

