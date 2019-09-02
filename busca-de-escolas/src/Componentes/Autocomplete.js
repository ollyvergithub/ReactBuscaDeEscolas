import React from 'react';

class Autocomplete extends React.Component{

    constructor(props){
        super(props);

    }

    render() {
        return (
            <article className="form-group col-md-4">
                <select className="form-control" id='esola-autocomplete'>
                    {
                        this.props.escolaAutoComplete.map(escola => {
                            return (
                              <option>Nome: {escola.nomesc}</option>
                            );
                        })
                    }

                </select>
            </article>

        );
    }

}

export default Autocomplete;