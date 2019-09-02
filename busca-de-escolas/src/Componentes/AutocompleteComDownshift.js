import React from 'react';
import Downshift from 'downshift';


const AutocompleteComDownshift = ({onInputChangeDownshift, downshiftOnChange, escolas_autocomplete}) =>(

    <Downshift onChange={downshiftOnChange} itemToString={escolas_autocomplete => (escolas_autocomplete ? escolas_autocomplete.name : '')}>
        {/* // pass the downshift props into a callback*/}
        {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex, selectedItem, getLabelProps }) => (
            <div>

                {/* // add a label tag and pass our label text to the getLabelProps function*/}
                <label {...getLabelProps()}>Escolha uma Escola</label>

                {/*// add our input element and pass our placeholder to the getInputProps function*/}
                <input {...getInputProps({
                    onChange: onInputChangeDownshift,
                    placeholder: "Escolha uma escola",
                    className: "form-control",
                    id: 'input-escolas-autocomplete'
                })} />

                {/*// if the input element is open, render the div else render nothing*/}
                {isOpen ? (
                    <div className="downshift-dropdown">
                        {
                            // filter the escolas_autocomplete and return items that match the inputValue

                            escolas_autocomplete
                            //.filter(item => !inputValue || item.nomesc.toLowerCase().includes(inputValue.toLowerCase()))

                            /*.filter(i => !inputValue || i.includes(inputValue))*/
                            // map the return value and return a div
                                .map((item, index) => (
                                    <div className="dropdown-item"
                                         {...getItemProps({ key: item.nomesc, index, item })}
                                         style={{
                                             backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                                             fontWeight: selectedItem === item ? 'bold' : 'normal',
                                         }}>
                                        {item.nomesc}
                                    </div>
                                ))
                        }
                    </div>
                ) : null}
            </div>
        )}
    </Downshift>
);

export default AutocompleteComDownshift;