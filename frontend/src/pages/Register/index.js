import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import '../../services/api'
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Register() {
    //Buscando dados dos inputs e armazenando no useState e enviando à api
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    //Enviar usuário para a pg de login
    const history = useHistory ();

    //Função de cadastro de usuário do BD, assim que acioanado o form
   async function handleRegister(e) {
        e.preventDefault(); //evita que a pagina recarregue
        
        //Objeto javascript
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };
        //chamando a api e fazendo o cadastro
       try {
            const response = await api.post ('ongs', data);

            //usando o history p/ enviar o user p/ page login
            history.push('/');

        //alerta com ID gerado no cadastro
        alert(`Seu ID de acesso: ${response.data.id}`); 
            } 
            catch (err) {
            alert('Erro de cadastro, tente novamente.')
                }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p> Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </section>
                            
                <form onSubmit={handleRegister}> 
                    <input placeholder="Nome da ONG" value={name}  onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder="E-mail" value={email}  onChange={e => setEmail(e.target.value)} />
                    <input placeholder="Whatsapp" value={whatsapp}  onChange={e => setWhatsapp(e.target.value)} />

                        <div className="input-group">
                            <input placeholder="Cidade" value={city}  onChange={e => setCity(e.target.value)} />
                            <input placeholder="UF" style={{ width: 80 }}  value={uf}  onChange={e => setUf(e.target.value)} />
                        </div>

                        <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );

}