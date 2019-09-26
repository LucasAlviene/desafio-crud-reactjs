import React,{useState} from 'react';
import {Link} from "react-router-dom";

import {axios,Alert,Loading,sleep} from '../../utils';

import Usuario from './usuario';
import removerUsuario from './remover';

export default ({match}) => {
    const [usuario, setUsuario] = useState([]);
    const [loading, setLoading] = useState(null);
    const [msg,setMsg] = useState({color:'',msg:'',show:true});

    if(loading == null){
        setLoading(true);
        axios({
            url:'?id='+match.params.id,
            method:'GET'
        }).then( data => {
            sleep(1000).then(() => { // Simular latência do servidor
                setLoading(false);
                setUsuario(data.data);
                if(data.data.length == 0){
                    setMsg({color:'blue',msg:'Não foi possivel encontrar esse usuário',show:false});
                }
            });
        });
    }

    const openModal = () => {
        var element = document.querySelector('.modal#modalConfirma');
        var instance = window.M.Modal.init(element, []);
        instance.open();
    }
    const deleteUser = async () => {
        setLoading(true);
        const result = await removerUsuario(usuario[0].id);
        if(result){
            setMsg({color:'green',msg:'O usuário foi removido com sucesso.',show:false});
        }else{
            setMsg({color:'red',msg:'Ocorreu algum erro, tente novamente ou contate o administrador.',show:true});
        }
        setLoading(false);
    }
    return(
        <div className='container'>
            <div className='row'>
                <h4 className='title' style={{float:'left'}}>Informação do Usuário</h4>
                <Link to='/' className='btn blue-grey darken-4' style={{float:'right',marginTop:20}}>Voltar</Link>
            </div>
            <Alert data={msg}/>
            {msg.show &&
                <div className="card">
                    <div className="card-content info-user">
                    {loading && <Loading size={'small'} position={'center'} />}
                    {!loading && usuario.length > 0 && <Usuario data={usuario[0]} onClick={openModal} />}
                    </div>
                </div>
            }
            <div id="modalConfirma" className="modal">
                <div className="modal-content">
                <h4>Tem certeza que deseja apagar?</h4>
                <p>Se você apagar, o usuário será perdido para sempre.</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat left">Fechar</a>
                    <button onClick={deleteUser} className="modal-close waves-effect waves-red red btn">Apagar</button>
                </div>
            </div>
        </div>
    );
}