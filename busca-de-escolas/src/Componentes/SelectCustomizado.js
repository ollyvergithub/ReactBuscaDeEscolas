import React from 'react';


const SelectCustomizado = ( {campoApiValue, campoApiExibicao, name, label, onChange, retornoApi, ...outrasProps } ) => (
    <div>
        <label htmlFor={name}>{label}</label>

        <select onChange={onChange} {...outrasProps}>
            <option value="">Selecione uam opção</option>
            {
               retornoApi.map(item =>{
                   return (
                       <option value={item[campoApiValue]} key={item[campoApiValue]}>{ (item[campoApiExibicao]) ? item[campoApiExibicao] : item[campoApiValue]}</option>
                   );
               })
            }
        </select>
    </div>
);

export default SelectCustomizado;