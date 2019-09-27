import React,{useState} from 'react';
import {Link} from "react-router-dom";

import {axios,Loading,sleep} from '../../utils';

import Item from './item';

export default (props) => {
    const [lista, setLista] = useState([]);
    const [sort, setSort] = useState({coluna:"",order:"asc"});
    const [loading, setLoading] = useState(null);

    function consultar(url = ""){
        setLoading(true);

        axios({
            url,
            method:'GET'
        }).then((data) => {
            sleep(300).then(() => { // Simular latência do servidor
                setLoading(false);
                setLista(data.data);
            });
        });
    }

    
    if(loading == null){
        consultar();
    }

    const ordernar = coluna => {
        const order = sort.order === "asc" ? "desc" : "asc";
        setSort({coluna,order});
        consultar("?_sort="+coluna+"&_order="+order);
    }

    const orderText = coluna => {
        if(coluna === sort.coluna){
            if(sort.order === "asc") return <i className="material-icons">arrow_drop_up</i>;
            return <i className="material-icons">arrow_drop_down</i>;
        }
    }
    return (
        <div className='container'>
            <div className='row'>
                <h4 className='title' style={{float:'left'}}>Lista de Usuários</h4>
                <Link to='/adicionar' className='btn blue-grey darken-4 waves-effect waves-light' style={{float:'right',marginTop:20}}>Criar</Link>
            </div>
            <table className="striped responsive-table">
                <thead>
                    <tr>
                        <th onClick={() => ordernar('id')}>ID {orderText("id")}</th>
                        <th onClick={() => ordernar('nome')}>Nome {orderText("nome")}</th>
                        <th onClick={() => ordernar('vaga')}>Vaga {orderText("vaga")}</th>
                        <th onClick={() => ordernar('email')}>Email {orderText("email")}</th>
                        <th onClick={() => ordernar('data')}>Data de Nascimento {orderText("data")}</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map( (item,key) => <Item key={key} data={item}/>)}
                    {lista.length === 0 &&
                        <tr>
                            <td style={{textAlign:'center'}} colSpan={6}>Nenhum usuário encontrado</td>
                        </tr>

                    }
                </tbody>
            </table>
            <span className='legend'>Mostrando {lista.length} Usuários.</span>
            {loading && <Loading size={'small'} position={'center'} />}
        </div>
    )
};