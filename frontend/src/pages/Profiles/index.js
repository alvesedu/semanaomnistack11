import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api.js';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');
    
    

    useEffect(() => {
    api.get('profile', {
        headers: {
            Authorization: ongId,
        }
    }).then(response => {
        setIncidents(response.data);
    })
    }, [ongId]);
        //Função pra delete caso do bd
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, 
            {
                headers: { Authorization: ongId, }
            });
            // recarregar page após o delete
            setIncidents(incidents.filter(incident => incident.id !== id));

        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }
        //função Logout
    function handleLogout() {
        localStorage.clear();
        history.push('/');
        
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="The Be Hero" />
                <span>Bem vinda, {ongName}</span>
                    <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>   
                    <button type="button" onClick={handleLogout}>
                        <FiPower size={18} color="#e02041" />
                    </button>
            </header>
            <h1> Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p> {incident.title}</p>
                    <strong> Descrição:</strong>
                    <p> {incident.description}</p>
                    <strong>Valor:</strong>
                    <p> {Intl.NumberFormat('pt-BR', { style: 'currency', currency:'BRL' }).format(incident.value)}</p>
                    <button onClick={() => handleDeleteIncident(incident.id)} type="button"> 
                    <FiTrash2 size={20} color="a8a8b3"/>
                    </button>
                </li>) )}
            </ul>
        </div>
    );
}