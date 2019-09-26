import React from 'react';
import {Link} from "react-router-dom";
import Moment from 'moment';

export default (props) => {
    const usuario = props.data; 
    return (
        <div>
            <span className="card-title">{usuario.nome}</span>
            <p><b>Vaga</b> {usuario.vaga}</p>
            <p><b>Data de Nascimento</b> {Moment.unix(usuario.data).format("DD-MM-YYYY")}</p>
            <p><b>Email</b> {usuario.email}</p>
            <Link to={'/editar/'+usuario.id} className='btn green darken-1'>Editar</Link>
            <button onClick={props.onClick} className='btn red darken-1 right'>Apagar</button>
        </div>
    );
}