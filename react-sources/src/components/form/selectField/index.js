import React, { Component } from 'react';

function LabelDefault(props) {
    return (
        <label htmlFor={props.forAttr}>{props.label}</label>
    );
}

function LabelWithLink(props) {
    return (
        <div className="form-group__label-wrapper clearfix">
            <label htmlFor={props.forAttr}>{props.label}</label>

            <div className="form-group__link-r">
                <a className="link" href={props.linkUrl}>{props.linkText}</a>
            </div>
        </div>
    );
}

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
        const hasLink = this.props.hasLink || false;
        
        let label;

        if (hasLink === true) {
            label = <LabelWithLink 
                label={this.props.label}
                linkUrl={this.props.linkUrl}
                linkText={this.props.linkText}
                forAttr={this.props.id}
            />;
        } else {
            label = <LabelDefault
                label={this.props.label}
                forAttr={this.props.id}
            />;
        }

        return (
            <div className="form-group select-box">
                {label}
                    <div className="select-control">
                    <select className="select form-control" name={this.props.name} id={this.props.id} value={this.state.value} onChange={this.handleChange}>

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