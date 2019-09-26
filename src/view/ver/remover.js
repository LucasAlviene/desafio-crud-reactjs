import {axios,sleep} from '../../utils';

export default async(id) => {
    await sleep(1000); // Simular latencia de servidor
    const result = await axios({
        method:'DELETE',
        url:'/'+id
    });
    const status = result.status;
    if(status >= 200 && status < 300){
        return true;
    }
    return false;
}