import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './checkboxField.sass';

class Checkbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: this.props.checked || false
        };

         // This binding is necessary to make `this` work in the callback
         this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({isChecked: event.target.checked});
    }

    componentDidMount() {
        //
    }
    
    render() {
        return (
            <div className="form-group form-group-checkbox">
                <div className="checkbox-field">
                    <label>
                        <input className="sr-only" type="checkbox" checked={this.state.isChecked} name={this.props.name} onChange={this.handleChange} /><span className="checkbox-field__text">{this.props.label}</span>
                    </label>
                </div>
            </div>
        );
    }
}

Checkbox.propTypes = {
    placeholder: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string
};

export default Checkbox;