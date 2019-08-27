import React from 'react';

class ExibeEscolasRetornadasPelaBusca extends React.Component{

    constructor(props){
        super(props)

        console.log('Construtor ExibeEscolasRetornadasPelaBusca: ', this.props)
    }

    render() {

        return(
            <div>
                <table className="table table-striped table-bordered">
                    <thead>
                    <tr>
                        <th scope="col">Código</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Diretoria Regional de Educação</th>
                        <th scope="col">Endereço</th>
                        <th scope="col">Mais Informações</th>
                    </tr>
                    </thead>
                    <tbody>

                        {
                            this.props.listaDeEscolasRetornadasPelaBusca.map(escola =>{
                                return (
                                    <tr key={escola.codesc}>
                                    <td>{escola.codesc}</td>
                                    <td>{escola.nomesc}</td>
                                    <td>{escola.tipoesc}</td>
                                    <td>{escola.diretoria}</td>
                                    <td>{escola.endereco}</td>
                                    <td>Mais informações</td>
                                    </tr>
                                );
                            })
                        }


                    </tbody>
                </table>
            </div>

        );
    }
}
export default ExibeEscolasRetornadasPelaBusca;