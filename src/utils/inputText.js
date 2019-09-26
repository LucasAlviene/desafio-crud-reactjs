import React from 'react';

export default props => {

    const {onChange,onError,value,nome,name,type,msg,isActive} = props;

    return (
        <div className={"input-field"+(onError ? " error" :"")}>
            <input id={name} name={name} type={type || "text"} className={"validate"+(value == "" ? "" :" valid")} onBlur={onChange} onChange={onChange} value={value}/>
            <label for={name} className={isActive ? "active" : ""}>{nome}</label>
            <span class="helper-text">{msg}</span>
        </div>
    );
}