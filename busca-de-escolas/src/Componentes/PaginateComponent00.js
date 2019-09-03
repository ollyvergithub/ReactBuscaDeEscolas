import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
require('bootstrap/scss/bootstrap.scss');
//import 'bootstrap/dist/css/bootstrap.css';

class PaginateComponent extends React.Component{

    constructor(props) {
        super(props);

        this.state = {activePage: 15, itemClass:"page-item", linkClass:"page-link"};
    }

    handlePageChange(pageNumber){
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    render() {
        return (
            <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={10}
                totalItemsCount={450}
                onChange={this.handlePageChange.bind(this)}
            />
        );

    }
}
export default PaginateComponent