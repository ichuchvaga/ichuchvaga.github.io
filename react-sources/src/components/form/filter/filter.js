import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'react-addons-update';
import './filter.sass';

class Filter extends Component {
    constructor(props) {
        super(props);

        /* initial state */
        this.state = {
            chips: [],
            KEY:   {
                backspace: 8,
                tab:       9,
                enter:     13
            },
            // only allow letters, numbers and spaces inbetween words
            INVALID_CHARS: /[^a-zA-Z0-9 ]/g
        };

        // This binding is necessary to make `this` work in the callback
        this.onKeyDown = this.onKeyDown.bind(this);
        this.clearInvalidChars = this.clearInvalidChars.bind(this);
        this.deleteChip = this.deleteChip.bind(this);
    }

    componentDidMount(prevProps, prevState, snapshot) {
        this.setChips(this.props.chips);
    }

    componentWillReceiveProps(nextProps) {
        this.setChips(nextProps.chips);
    }

    setChips(chips) {
        if (chips && chips.length) this.setState({ chips });
    }

    onKeyDown(event) {
        let keyPressed = event.which;

        if (keyPressed === this.state.KEY.enter || (keyPressed === this.state.KEY.tab && event.target.value)) {
            event.preventDefault();
            this.updateChips(event);
        } else if (keyPressed === this.state.KEY.backspace) {
            let chips = this.state.chips;

            if (!event.target.value && chips.length) {
                this.deleteChip(chips[chips.length - 1]);
            }
        }
    }

    clearInvalidChars(event) {
        let value = event.target.value;

        if (this.state.INVALID_CHARS.test(value)) {
            event.target.value = value.replace(this.state.INVALID_CHARS, '');
        } else if (value.length > this.props.maxlength) {
            event.target.value = value.substr(0, this.props.maxlength);
        }
    }

    updateChips(event) {
        if (!this.props.max || this.state.chips.length < this.props.max) {
            let value = event.target.value;

            if (!value) return;

            let chip = value.trim().toLowerCase();

            if (chip && this.state.chips.indexOf(chip) < 0) {
                this.setState({
                    chips: update(
                        this.state.chips,
                        {
                            $push: [chip]
                        }
                    )
                });
            }
        }

        event.target.value = '';
    }

    deleteChip(chip) {
        let index = this.state.chips.indexOf(chip);
        
        if (index >= 0) {
            this.setState({
            chips: update(
                this.state.chips,
                {
                $splice: [[index, 1]]
                }
            )
            });
        }
    }

    focusInput(event) {
        let children = event.target.children;
        if (children.length) children[children.length - 1].focus();
    }


    render() {
        let chips = this.state.chips.map((chip, index) => {
            return (
                
                <span className="filter-control-option" key={index}>
                    <span className="filter-control-option-value">{chip}</span>
                    {/*eslint-disable-next-line*/}
                    <a className="icon icon-close-circle-red" href="javascript:void(0);" title="Delete selected item" onClick={this.deleteChip.bind(null, chip)}>&nbsp;</a>
                </span>

            );
        });
    
        let placeholder = !this.props.max || chips.length < this.props.max ? this.props.placeholder : '';

        return (

            <div className="form-group form-group--filter">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <div className="filter-control">
                    <div className="filter-control__body clearfix" onClick={this.focusInput}>
                        {chips}

                        <input
                            className="form-control filter-control-input" 
                            type="text" 
                            placeholder={placeholder} 
                            name="search-input" 
                            defaultValue="" 
                            onKeyDown={this.onKeyDown} 
                            onKeyUp={this.clearInvalidChars}
                            id={this.props.id}
                        />
                    </div>
                    {/*eslint-disable-next-line*/}
                    <a className="filter-control__search-icon" href="javascript:void(0)"></a>
                </div>
            </div>

        )
    }
}

Filter.defaultProps = {
    placeholder: 'Add an item...',
    maxlength: 20
};

Filter.propTypes = {
    chips: PropTypes.array,
    max:   PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    maxlength: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    placeholder: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string
};
  

export default Filter;