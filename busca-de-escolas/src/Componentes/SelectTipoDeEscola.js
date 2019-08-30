import React from 'react';

class SelectTipoDeEscola extends React.Component{

    constructor(props){
        super(props)

    }

    render() {
        return (
            <div>
                <article className="form-group col-md-4">
                    <label htmlFor="busca_tipo_de_escola">Tipo de Escola</label>
                    <select value={this.state.tipoEscolaSelect} onChange={this.escoheTipoEscola.bind(this)} className="form-control" id="busca_tipo_de_escola" name="busca_tipo_de_escola">
                        <option value="">Selecione uam opção</option>
                        {
                            this.state.tipoEscola.map(tipoEscola =>{
                                return (
                                    <option value={tipoEscola.tipoesc} key={tipoEscola.tipoesc}>{tipoEscola.tipoesc}</option>
                                );
                            })
                        }
                    </select>
                </article>
            </div>
        );
    }
}

export default SelectTipoDeEscola;