import React, { useState } from 'react';
import {Link} from "react-router-dom";
import Moment from 'moment';

import {Alert, Loading,axios,sleep,InputText} from '../../utils';
import EditUser from './edita';

export default ({match}) => {
    const userID = match.params.id;
    const [usuario, setUsuario] = useState([{nome:"",vaga:"",data:"",email:""}]);
    const [loading, setLoading] = useState(null);
    const [errorInput,setErrorInput] = useState({nome:false,vaga:false,data:false,email:false});
    const [msg,setMsg] = useState({color:'',msg:'',show:true});
    const [loadingForm, setLoadingForm] = useState(false);

    if(loading == null){
        setLoading(true);
        axios({
            url:'?id='+userID,
            method:'GET'
        }).then( data => {
            sleep(1000).then(() => { // Simular latência do servidor
                setLoading(false);
                let tempUser = data.data;
                if(data.data.length === 0){
                    setMsg({color:'blue',msg:'Não foi possivel encontrar esse usuário',show:false});
                }else{
                    tempUser[0].data = Moment.unix(tempUser[0].data).format("YYYY-MM-DD");
                    setUsuario(tempUser);
                }
            });
        });
    }

    const onSubmit = async(event) => {
        setLoadingForm(true);
        event.preventDefault();
        try{
           const result = await EditUser(userID,usuario[0]);
             if(result){
                setMsg({color:'green',msg:'O usuário foi editado com sucesso.',show:true});
            }else{
                setMsg({color:'red',msg:'Ocorreu algum erro, tente novamente ou contate o administrador.',show:true});
            }
        }catch(getError){
            setErrorInput(getError);
        }
        setLoadingForm(false);
    }

    const changeValue = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        let tempUser = {...usuario[0]};
        tempUser[name] = value;
        setUsuario([tempUser]);

        let tempError = {...errorInput};
        tempError[name] = value === "" ? true : false;
        setErrorInput(tempError);
    }
    const {nome,vaga,data,email} = usuario[0];
    console.log(data);
    return (
        <div className='container'>
            <div className='row'>
                <h4 className='title' style={{float:'left'}}>Editar Usuário</h4>
                <Link to='/' className='btn blue-grey darken-4' style={{float:'right',marginTop:20}}>Voltar</Link>
            </div>
            <Alert data={msg} />
            {msg.show &&
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">Editar usuário</span>
                        {loading && <Loading size={'small'} position={'center'} />}
                        {!loading && usuario.length > 0 &&
                            <form method='POST' onSubmit={onSubmit}>
                                <InputText 
                                    onChange={changeValue}
                                    onError={(errorInput.nome)}
                                    name="nome"
                                    nome="Nome Completo"
                                    msg="Você não preencheu seu nome"
                                    value={nome}
                                    isActive={true}
                                />
                                <InputText 
                                    onChange={changeValue}
                                    onError={(errorInput.vaga)}
                                    name="vaga"
                                    nome="Vaga"
                                    msg="Você não preencheu sua vaga"
                                    value={vaga}
                                    isActive={true}
                                />
                                <InputText 
                                    onChange={changeValue}
                                    onError={(errorInput.data)}
                                    name="data"
                                    type="date"
                                    nome="Data de Nascimento"
                                    msg={data === "" ? "Você não preencheu sua data de nascimento" : "A data de nascimento é inválida"}
                                    value={data}
                                    isActive={true}
                                />
                                <InputText 
                                    onChange={changeValue}
                                    onError={(errorInput.email)}
                                    name="email"
                                    nome="E-mail"
                                    type="email"
                                    msg={email === "" ? "Você não preencheu seu email" : "Seu email é inválido"}
                                    value={email}
                                    isActive={true}
                                />
                                <div className='row'>
                                    <button className='btn blue-grey darken-4 left'>Editar</button>
                                    {loadingForm && <Loading size={'small'} />}
                                </div>
                            </form>
                        }
                    </div>
                </div>
            }
        </div>);
};