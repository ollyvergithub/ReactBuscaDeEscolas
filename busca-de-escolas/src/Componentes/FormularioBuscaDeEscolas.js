import React from 'react';

class FormularioBuscaDeEscolas extends React.Component{

    render() {
        return (
            <form id="formulario_busca_escola">
                <fieldset>
                    <legend>Busca de Escolas</legend>
                    <section className="form-row">
                        <article className="form-group col-md-4">
                            <label htmlFor="busca_escola">Busca de Escolas</label>
                            <input type="text" className="form-control" id="busca_escola" name="busca_escola" placeholder="Digite o nome de uma escola"/>
                        </article>
                        <article className="form-group col-md-4">
                            <label htmlFor="busca_tipo_de_escola">Tipo de Escola</label>
                            <select className="form-control" id="busca_tipo_de_escola" name="busca_tipo_de_escola">
                                <option value="">Selecione uam opção</option>

                            </select>
                        </article>
                        <article className="form-group col-md-4">
                            <label htmlFor="busca_dre">Busca DRE</label>
                            <select className="form-control" id="busca_dre" name="busca_dre">
                                <option value="">Selecione uam opção</option>

                            </select>
                        </article>
                        <button id="form_submit" name="form_submit" className="btn btn-primary" type="submit">Buscar
                            Escolas
                        </button>
                    </section>
                </fieldset>
            </form>
        );
    }

}
export default FormularioBuscaDeEscolas