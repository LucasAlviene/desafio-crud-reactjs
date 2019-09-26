import {axios,sleep,validateEmail} from '../../utils';
import Moment from 'moment';

export default async(usuario) => {
    await sleep(1000); // Simular latencia de servidor
    let erros = {};
    const {nome,vaga,data,email} = usuario;
    if(nome === "") erros.nome = true;
    if(vaga === "") erros.vaga = true;
    if(data === "" || !Moment(data).isValid()) erros.data = true;
    if(email === "" || !validateEmail(email)) erros.email = true;
    
    if(Object.keys(erros).length > 0) throw erros;

    const date = Moment(data).format("X");

    const result = await axios({
        method:'POST',
        data:{
            nome,
            vaga,
            data:date,
            email
        }
    });
    const status = result.status;
    if(status >= 200 && status < 300){
        return true;
    }
    return false;
}