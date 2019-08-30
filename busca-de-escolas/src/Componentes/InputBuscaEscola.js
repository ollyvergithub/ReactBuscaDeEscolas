import React from 'react';

const InputBuscaEscola = ({nomeEscolaInput, escolheEscola, ...otherProps}) => (

    <article className="form-group col-md-4">
        <label htmlFor="busca_escola">Busca de Escolas</label>
        <input type="text" className='form-control' onChange={escolheEscola} {...otherProps}/>
    </article>

);

export default InputBuscaEscola;