import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputField extends Component {
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

                <input 
                    className="form-control" 
                    type="text"
                    placeholder={this.props.placeholder} 
                    name={this.props.name} 
                    defaultValue={this.state.inputValue} 
                    id={this.props.id} 

                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

InputField.propTypes = {
    placeholder: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string
};

export default InputField;