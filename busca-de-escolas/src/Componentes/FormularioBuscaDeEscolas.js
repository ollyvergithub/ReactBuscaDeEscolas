import React from 'react';

// Meus Componentes
import ExibeEscolasRetornadasPelaBusca from './ExibeEscolasRetornadasPelaBusca';
import SelectCustomizado from './SelectCustomizado';
import AutocompleteComDownshift from './AutocompleteComDownshift';
import Paginacao from './Paginacao'

class FormularioBuscaDeEscolas extends React.Component{

    constructor(){
        super();
        this.state = {
            escolas_autocomplete: [],
            nomeEscolaInput: '',
            tipoEscola: [], tipoEscolaSelect: '',
            dres: [],
            dreSelect: '',
            listaDeEscolasRetornadasPelaBusca: [],
            PaginacaoPaginasTotal: 0,
            PaginacaoPaginaAtual: 1,
        };
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
            });
    }

    buscaEscolas(evento){
        evento.preventDefault();

        // Para a Paginação
        this.setState({PaginacaoPaginaAtual:1});
        this.setState({PaginacaoPaginasTotal:0});

        fetch('https://hom-escolaaberta.sme.prefeitura.sp.gov.br/api/escolas/?tipoesc=' + this.state.tipoEscolaSelect + '&search=' + this.state.nomeEscolaInput + '&dre=' +  this.state.dreSelect)
            .then(resposta =>{
                if (resposta.ok){
                    return resposta.json();
                }else {
                    throw new Error('Não foi possivel buscar as escolas filtradas')
                }
            })
            .then(lista_escolas_filtradas =>{
                this.setState({listaDeEscolasRetornadasPelaBusca: lista_escolas_filtradas.results});
                this.setState({PaginacaoPaginasTotal: lista_escolas_filtradas.count});
                this.setState({PaginacaoPaginasTotal: Math.ceil((lista_escolas_filtradas.count)/10)});
            })
    }

    buscaEscolasPaginacao(page){
        fetch('https://hom-escolaaberta.sme.prefeitura.sp.gov.br/api/escolas/?tipoesc=' + this.state.tipoEscolaSelect + '&search=' + this.state.nomeEscolaInput + '&dre=' +  this.state.dreSelect + '&page='+ page)
            .then(resposta =>{
                if (resposta.ok){
                    return resposta.json();
                }else {
                    throw new Error('Não foi possivel buscar as escolas filtradas')
                }
            })
            .then(lista_escolas_filtradas =>{
                this.setState({listaDeEscolasRetornadasPelaBusca: lista_escolas_filtradas.results});
            })

    }

    escoheTipoEscola(evento){
        this.setState({tipoEscolaSelect: evento.target.value });
    }

    escolheDre(evento){
        this.setState({dreSelect: evento.target.value });
    }

    downshiftOnChange(evento){
        this.setState({nomeEscolaInput:evento.nomesc });
        document.getElementById("input-escolas-autocomplete").value = evento.nomesc;

    }
    onInputChangeDownshift(evento){
        let valor =  evento.target.value;

        fetch('https://hom-escolaaberta.sme.prefeitura.sp.gov.br/api/escolas/?search='+ valor)
            .then(resposta => {
                if (resposta.ok){
                    return resposta.json();
                }else {
                    throw new Error('Não foi possível escola Autocomplete');
                }
            })
            .then(escolas_autocomplete =>{
                this.setState({escolas_autocomplete: escolas_autocomplete.results});
            });
    }

    render() {
        return (
            <div>
                <form id="formulario_busca_escola" onSubmit={this.buscaEscolas.bind(this)}>
                    <fieldset>
                        <legend>Busca de Escolas</legend>
                        <section className="form-row">

                            <article className="form-group col-md-4">
                                <AutocompleteComDownshift  escolas_autocomplete = {this.state.escolas_autocomplete} onInputChangeDownshift = {this.onInputChangeDownshift.bind(this)} downshiftOnChange = {this.downshiftOnChange.bind(this)} />
                            </article>


                            <article className="form-group col-md-4">

                                <SelectCustomizado campoApiValue="tipoesc" retornoApi={this.state.tipoEscola} value={this.state.tipoEscolaSelect} onChange ={this.escoheTipoEscola.bind(this)} className="form-control" id="busca_tipo_de_escola" name="busca_tipo_de_escola" label="Escolha um Tipo de Escola"/>

                            </article>

                            <article className="form-group col-md-4">
                                {/*Os parametros campoApiValue e campoApiExibicao, são os campos retornados pela API*/}
                                <SelectCustomizado campoApiValue="dre" campoApiExibicao='diretoria' retornoApi={this.state.dres} value={this.state.dreSelect} onChange ={this.escolheDre.bind(this)} className="form-control" id="busca_dre" name="busca_dre" label="Escolha uma DRE"/>

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

                {
                    this.state.PaginacaoPaginasTotal > 0 ? (<Paginacao buscaEscolasPaginacao = {this.buscaEscolasPaginacao.bind(this)} PaginacaoPaginasTotal = {this.state.PaginacaoPaginasTotal}/>) : (null)
                }

            </div>
        );
    }

}
export default FormularioBuscaDeEscolas
