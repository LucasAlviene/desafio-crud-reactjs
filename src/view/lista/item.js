import React from 'react';
import {Link} from "react-router-dom";
import Moment from 'moment';

export default (props) => {
    const item = props.data;
    return(
        <tr>
            <td>{item.id}</td>
            <td>{item.nome}</td>
            <td>{item.vaga}</td>
            <td>{item.email}</td>
            <td>{Moment.unix(item.data).format("DD-MM-YYYY")}</td>
            <td>
                <Link to={"/ver/"+item.id} className='waves-effect waves-light btn-small blue darken-1'><i className='material-icons left'>visibility</i> Ver</Link>
            </td>
        </tr>
    )
}