import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './searchField.sass';

class SearchField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: this.props.value || ''
        };

         // This binding is necessary to make `this` work in the callback
         this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({inputValue: event.target.value});
    }
    
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>

                <div className="search-field">
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder={this.props.placeholder} 
                        name={this.props.name} 
                        defaultValue={this.state.inputValue} 
                        id={this.props.id} 

                        onChange={this.handleChange}
                    />

                    <input className="search-field__icon" type="submit" value="" />
                </div>
            </div>
        );
    }
}

SearchField.propTypes = {
    placeholder: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string
};

export default SearchField;