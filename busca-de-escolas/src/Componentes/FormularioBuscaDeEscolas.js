import React from 'react';

// Meus Componentes
import ExibeEscolasRetornadasPelaBusca from './ExibeEscolasRetornadasPelaBusca';

class FormularioBuscaDeEscolas extends React.Component{

    constructor(){
        super();
        this.state = {nomeEscolaInputPreenchido: '', tipoEscola: [], tipoEscolaSelect: '', dres: [], dreSelect: '', listaDeEscolasRetornadasPelaBusca: [] };
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
            })
    }

    buscaEscolas(evento){
        evento.preventDefault();
        console.log(' ----------------------- Função buscaEscolas -----------------------');
        console.log('Nome Escola | ', this.nomeEscolaInput.value);
        console.log('Tipo Escola Escolhida | ', this.state.tipoEscolaSelect);
        console.log('DRE Escolhida |  ', this.state.dreSelect);
        console.log('------------------------------------------------------------------------------------------');

        fetch('https://hom-escolaaberta.sme.prefeitura.sp.gov.br/api/escolas/?tipoesc=' + this.state.tipoEscolaSelect + '&search=' + this.nomeEscolaInput.value + '&dre=' +  this.state.dreSelect)
            .then(resposta =>{
                if (resposta.ok){
                    return resposta.json();
                }else {
                    console.log('Não foi possivel buscar as escolas filtradas');
                    throw new Error('Não foi possivel buscar as escolas filtradas')
                }
            })
            .then(lista_escolas_filtradas =>{
                this.setState({listaDeEscolasRetornadasPelaBusca: lista_escolas_filtradas.results});
                console.log('Lista de Escolas Retornadas pela Busca : ', lista_escolas_filtradas);
            })
    }

    escoheTipoEscola(evento){
        this.setState({tipoEscolaSelect: evento.target.value });
    }

    escolheDre(evento){
        this.setState({dreSelect: evento.target.value });
    }

    render() {
        return (
            <div>
                <form id="formulario_busca_escola" onSubmit={this.buscaEscolas.bind(this)}>
                    <fieldset>
                        <legend>Busca de Escolas</legend>
                        <section className="form-row">
                            <article className="form-group col-md-4">
                                <label htmlFor="busca_escola">Busca de Escolas</label>
                                <input type="text" value={this.state.nomeEscolaInput} ref={input => this.nomeEscolaInput = input } className="form-control" id="busca_escola" name="busca_escola" placeholder="Digite o nome de uma escola"/>
                            </article>
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
                            <article className="form-group col-md-4">
                                <label htmlFor="busca_dre">Busca DRE</label>
                                <select value={this.state.dreSelect} onChange={this.escolheDre.bind(this)} className="form-control" id="busca_dre" name="busca_dre">
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

                {
                    this.state.listaDeEscolasRetornadasPelaBusca.length > 0 ? (
                        <ExibeEscolasRetornadasPelaBusca listaDeEscolasRetornadasPelaBusca = {this.state.listaDeEscolasRetornadasPelaBusca}/>
                    ): (
                        null
                    )
                }

            </div>

        );
    }

}
export default FormularioBuscaDeEscolas

