import React, { Component } from 'react';
import Popup from '../../popups/pageDialog';

class Page extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isChecked: this.props.item.isChecked || false
        };

         // This binding is necessary to make `this` work in the callback
         this.updCheckedState = this.updCheckedState.bind(this);
    }

    updCheckedState(e) {
        this.setState({
            isChecked: !this.state.isChecked
        });
    }

    render(){
        const checkedClass = (this.state.isChecked) ? " check-control--active" : '';
        const img = "src/img/templates/pages/" + this.props.item.img;  

        return (
            <div className="pages-grid-item">
                <div className="pages-grid-item__img" style={{backgroundImage: `url('${img}')`}}>
                    
                    {/*eslint-disable-next-line*/}
                    <a className={"check-control" + checkedClass} href="javascript:void(0);" onClick={this.updCheckedState} onTouchStart={this.updCheckedState}>
                        <i className="icon"></i>
                    </a>
                    
                    <Popup 
                        title={this.props.item.title} 
                        img={this.props.item.previewImg}
                        caption={this.props.item.previewCaption}
                    />
                </div>

                <div className="pages-grid-item__name">{this.props.item.title}</div>
            </div>
        )
    }
}

export default Page;