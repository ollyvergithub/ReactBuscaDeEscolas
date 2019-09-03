//const UltimatePagination = reactUltimatePaginationBootstrap4.default;
import React from 'react';
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4'

class Paginacao extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            total: 5000
        };
        this.onPageChange = this.onPageChange.bind(this);

        console.log('Paginação Construtor ', props);
    }

    onPageChange(page) {
        this.setState({page});
        console.log('Página : ', page);
        this.setState({PaginacaoPaginasTotal: page});
        this.props.buscaEscolasPaginacao(page);
    }
    render() {
        return (
            <div>
                <h2>react-ultimate-pagination-bootstrap-4</h2>
                <UltimatePagination
                    currentPage={this.state.page}
                    totalPages={this.props.PaginacaoPaginasTotal}
                    onChange={this.onPageChange}
                />
            </div>
        );

    }
}
export default Paginacao