import React from 'react';

export default (props) => {
    const Alert = props.data;
    if(Alert.msg === "") return null;
    return (
        <div className={"card darken-1 "+Alert.color}>
            <div className="card-content white-text">
                {Alert.msg}
            </div>
        </div>
    );
}