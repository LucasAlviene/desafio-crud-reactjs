import axios from './api';
import Alert from './alert';
import Loading from './loading';
import sleep from './sleep';
import InputText from './inputText';

const validateEmail = email =>{
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export {axios,Alert,Loading,sleep,InputText,validateEmail};