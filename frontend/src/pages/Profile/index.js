import React, { useState, useEffect }from "react";
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import "./styles.css"

export default function Profile () {
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongID');
    const ongName = localStorage.getItem('ongName');
    
    useEffect(() => {
        api.get('profile', {
            headers: {
                auth: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`/incidents/${id}`, {
                headers: {
                    auth: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (err) {
            alert("Erro ao deletar caso, tente novamente")
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
          <header>
             <img src={logoImg} alt="Be the hero icon"/>
             <span> Bem vinda, {ongName} </span>


             <Link to="/incidents/new" className="button">
                Cadastrar novo caso
             </Link>

             <button type="button">
                <FiPower size={18} color="#E02041" onClick={handleLogout} />
             </button>
          </header>

          <h1> Casos cadastrados </h1>
          
          <ul>
              {incidents.map(incident => (
                <li key={incident.id}>
                    <strong> CASO: </strong>
                    <p>{incident.title}</p>

                    <strong> DESCRIÇÃO </strong>
                    <p> {incident.description} </p>

                    <strong> VALOR </strong>
                    <p> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)} </p>

                    <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
              ))} 
          </ul>
        </div>
    );
}