import React from 'react';

const InputCustomizado = ({nomeEscolaInput, escolheEscola, id, label, ...otherProps}) => (

    <article className="form-group col-md-4">
        <label htmlFor={id}>{label}</label>
        <input id={id} onChange={escolheEscola} {...otherProps}/>
    </article>

);

export default InputCustomizado;