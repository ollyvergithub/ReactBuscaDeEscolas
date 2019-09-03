import * as React from "react";
import { Page,  Button } from "tabler-react";
class PaginateComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //array: [this.props.listaDeEscolasRetornadasPelaBusca],
            //array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            array: [],
            limit: 5, // optional
            page: 1
        };

        console.log('Paginate Component | ' ,this.props.listaDeEscolasRetornadasPelaBusca)
    }

    componentWillMount() {

    }

    paginateValue = (page) => {
        this.setState({ page: page });
        console.log(page) // access this value from parent component
    }

    paginatePrevValue = (page) => {
        this.setState({ page: page });
        console.log(page)  // access this value from parent component
    }
    paginateNxtValue = (page) => {
        this.setState({ page: page });
        console.log(page)  // access this value from parent component
    }

    render() {
        return (
            <div>
                <div>
                    <Button.List>
                        <Button
                            disabled={this.state.page === 0}
                            onClick={() => this.paginatePrevValue(this.state.page - 1)}
                            outline
                            color="primary"
                        >
                            Previous
                        </Button>

                        {this.state.array.map((value, index) => {
                            return (
                                <Button
                                    onClick={() => this.paginateValue(value)}
                                    color={
                                        this.state.page === value
                                            ? "primary"
                                            : "secondary"
                                    }
                                >
                                    {value}
                                </Button>
                            );
                        })}

                        <Button
                            onClick={() => this.paginateNxtValue(this.state.page + 1)}
                            outline
                            color="secondary"
                        >
                            Next
                        </Button>
                    </Button.List>
                </div>
            </div>

        )
    }
}

export default PaginateComponent;