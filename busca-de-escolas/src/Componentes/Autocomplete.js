import React from 'react';

class Autocomplete extends React.Component{

    constructor(props){
        super(props);

    }

    render() {
        return (
            <article className="form-group col-md-4">
                <ul className="form-control" id='escola-autocomplete'>
                    {
                        this.props.escolaAutoComplete.map(escola => {
                            return (
                                <li><a href="#"> Nome: {escola.nomesc}</a></li>
                            );
                        })
                    }

                </ul>
            </article>

        );
    }

}

export default Autocomplete;