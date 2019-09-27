import React, { useState } from 'react';
import {Link} from "react-router-dom";
import {Alert, Loading,InputText} from '../../utils';

import SaveUser from './save';

export default () => {
    const [usuario, setUsuario] = useState([{nome:"",vaga:"",data:"",email:""}]);
    const [loading, setLoading] = useState(false);
    const [errorInput,setErrorInput] = useState({nome:false,vaga:false,data:false,email:false});
    const [msg,setMsg] = useState({color:'',msg:''});

    const onSubmit = async(event) => {
        setLoading(true);
        event.preventDefault();
        try{
            const result = await SaveUser(usuario[0]);
            if(result){
                setUsuario([{nome:"",vaga:"",data:"",email:""}]);
                setMsg({color:'green',msg:'O usuário foi adicionado com sucesso.'});
            }else{
                setMsg({color:'red',msg:'Ocorreu algum erro, tente novamente ou contate o administrador.'});
            }
        }catch(getError){
            setErrorInput(getError);
        }
        setLoading(false);
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

    return (
        <div className='container'>
            <div className='row'>
                <h4 className='title' style={{float:'left'}}>Criar Usuário</h4>
                <Link to='/' className='btn blue-grey darken-4' style={{float:'right',marginTop:20}}>Voltar</Link>
            </div>
            <Alert data={msg} />
            <div className="card">
                <div className="card-content">
                    <span className="card-title">Criar usuário</span>
                    <form method='POST' onSubmit={onSubmit}>
                        <InputText 
                            onChange={changeValue}
                            onError={(errorInput.nome)}
                            name="nome"
                            nome="Nome Completo"
                            msg="Você não preencheu seu nome"
                            value={nome}
                        />
                        <InputText 
                            onChange={changeValue}
                            onError={(errorInput.vaga)}
                            name="vaga"
                            nome="Vaga"
                            msg="Você não preencheu sua vaga"
                            value={vaga}
                        />
                        <InputText 
                            onChange={changeValue}
                            onError={(errorInput.data)}
                            name="data"
                            type="date"
                            nome="Data de Nascimento"
                            msg={data === "" ? "Você não preencheu sua data de nascimento" : "A data de nascimento é inválida"}
                            value={data}
                        />
                        <InputText 
                            onChange={changeValue}
                            onError={(errorInput.email)}
                            name="email"
                            nome="E-mail"
                            type="email"
                            msg={email === "" ? "Você não preencheu seu email" : "Seu email é inválido"}
                            value={email}
                        />
                        <div className='row'>
                            <button className='btn blue-grey darken-4 left'>Criar</button>
                            {loading && <Loading size={'small'} />}
                        </div>
                    </form>
                </div>
            </div>
        </div>);
};