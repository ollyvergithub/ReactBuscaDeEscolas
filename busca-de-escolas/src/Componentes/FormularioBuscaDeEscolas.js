import React from 'react';

// Meus Componentes
import ExibeEscolasRetornadasPelaBusca from './ExibeEscolasRetornadasPelaBusca';
import InputCustomizado from './InputCustomizado';
import SelectCustomizado from './SelectCustomizado';
import Autocomplete from './Autocomplete';
import '../css/style.css';

class FormularioBuscaDeEscolas extends React.Component{

    constructor(){
        super();
        this.state = {nomeEscolaInput: '', tipoEscola: [], tipoEscolaSelect: '', dres: [], dreSelect: '', listaDeEscolasRetornadasPelaBusca: [], escolas_autocomplete: [] };
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
        console.log('Nome Escola | ', this.state.nomeEscolaInput);
        console.log('Tipo Escola Escolhida | ', this.state.tipoEscolaSelect);
        console.log('DRE Escolhida |  ', this.state.dreSelect);
        console.log('------------------------------------------------------------------------------------------');

        fetch('https://hom-escolaaberta.sme.prefeitura.sp.gov.br/api/escolas/?tipoesc=' + this.state.tipoEscolaSelect + '&search=' + this.state.nomeEscolaInput + '&dre=' +  this.state.dreSelect)
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

    escolheEscola(evento){
        evento.preventDefault();
        this.setState({nomeEscolaInput:evento.target.value });
        fetch('https://hom-escolaaberta.sme.prefeitura.sp.gov.br/api/escolas/?search='+this.state.nomeEscolaInput)
            .then(resposta => {
                if (resposta.ok){
                    return resposta.json();
                }else {
                    console.log('Não foi possível escola Autocomplete');
                    throw new Error('Não foi possível escola Autocomplete');
                }
            })
            .then(escolas_autocomplete =>{
                console.log('Escolas Autocomplete', escolas_autocomplete);
                this.setState({escolas_autocomplete: escolas_autocomplete.results});
                console.log('This State - Escolas Autocomplete', this.state.escolas_autocomplete);
            });

    }

    render() {
        return (
            <div>
                <form id="formulario_busca_escola" onSubmit={this.buscaEscolas.bind(this)}>
                    <fieldset>
                        <legend>Busca de Escolas</legend>
                        <section className="form-row">

                            <Autocomplete escolaAutoComplete = {this.state.escolas_autocomplete}/>

                            <InputCustomizado type="text" className='form-control' id='busca_escola' value={this.state.nomeEscolaInput} onChangeEscolheEscola ={this.escolheEscola.bind(this)} label="Escolha uma escola" />



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

            </div>

        );
    }

}
export default FormularioBuscaDeEscolas

