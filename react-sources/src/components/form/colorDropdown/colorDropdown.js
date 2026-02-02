import React, { Component } from 'react';
import './colorDropdown.sass';

class Select extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            options: []
        };
    
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    componentDidMount(prevProps, prevState, snapshot) {
        this.setOptions(this.props.options);
    }

    setOptions(options) {
        if (options && options.length) this.setState({ options });
    }
    

    render(){
        return (
            <div className="form-group select-box">
                <label htmlFor={this.props.id}>{this.props.label}</label>

                <div className="select-control select-control--colorbox">
                    <div className="select-colorbox" style={{backgroundColor: this.state.value}}></div>

                    <select className="select form-control" name={this.props.name} id={this.props.id} defaultValue={this.state.value} onChange={this.handleChange} >
                        {
                            this.state.options.map(function(value, index){
                                return (
                                    <option value={value} key={index}>{value}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
        )
    }
}

export default Select;