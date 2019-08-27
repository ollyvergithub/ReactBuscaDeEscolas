import React from 'react';

class FormularioBuscaDeEscolas extends React.Component{

    constructor(){
        super();
        this.state = {nomeEscola: '', tipoEscola: [], dres: [] };
    }

    buscaEscolas(evento){
        evento.preventDefault();
        console.log('Função buscaEscolas ---------------------------------------------');
        console.log('Tipo Escola | ', this.state.tipoEscola);
        console.log('DRE |  ', this.state.dres);

        console.log('------------------------------------------------------------------------------------------');
    }

    componentWillMount() {
        fetch('https://hom-escolaaberta.sme.prefeitura.sp.gov.br/api/tipo_escola')
            .then(resposta => {
                if (resposta.ok){
                    return resposta.json();
                }else {
                    throw new Error("Não foi possível encontrar o tipo de escola");
                }
            })
            .then(tipo_de_escola => {
                this.setState({tipoEscola: tipo_de_escola.results});
                console.log('Tipos de Escola : ', this.state.tipoEscola);
            });

        fetch('https://hom-escolaaberta.sme.prefeitura.sp.gov.br/api/diretorias')
            .then(resposta => {
                if (resposta.ok){
                    return resposta.json();
                }else {
                    throw new Error("Não foi possível encontrar a DRE");
                }
            })
            .then(dres => {
                this.setState({dres: dres.results});
                console.log('DRES : ', dres.results);
            })
    }

    render() {
        return (
            <form id="formulario_busca_escola" onSubmit={this.buscaEscolas.bind(this)}>
                <fieldset>
                    <legend>Busca de Escolas</legend>
                    <section className="form-row">
                        <article className="form-group col-md-4">
                            <label htmlFor="busca_escola">Busca de Escolas</label>
                            <input type="text" ref={input => this.nomeEscola = input } className="form-control" id="busca_escola" name="busca_escola" placeholder="Digite o nome de uma escola"/>
                        </article>
                        <article className="form-group col-md-4">
                            <label htmlFor="busca_tipo_de_escola">Tipo de Escola</label>
                            <select value={this.state.tipoEscola.tipoesc} className="form-control" id="busca_tipo_de_escola" name="busca_tipo_de_escola">
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
                        <article className="form-group col-md-4">
                            <label htmlFor="busca_dre">Busca DRE</label>
                            <select className="form-control" id="busca_dre" name="busca_dre">
                                <option value="">Selecione uam opção</option>
                                {
                                    this.state.dres.map(dre =>{
                                        return (
                                            <option value={dre.dre} key={dre.dre}>{dre.diretoria}</option>
                                        );
                                    })
                                }
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