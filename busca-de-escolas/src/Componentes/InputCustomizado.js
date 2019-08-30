import React from 'react';

const InputCustomizado = ({onChangeEscolheEscola, id, label, ...otherProps}) => (

    <article className="form-group col-md-4">
        <label htmlFor={id}>{label}</label>
        <input id={id} onChange={onChangeEscolheEscola} {...otherProps}/>
    </article>

);

export default InputCustomizado;