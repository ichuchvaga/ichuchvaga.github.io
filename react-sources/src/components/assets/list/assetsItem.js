import React, { Component } from 'react';

class AssetsItem extends Component {
  render() {
    return (
        <div className="listings-card">
            <div className="listings-card__img" style={{backgroundImage:'url("'+this.props.img+'")'}}></div>

            <div className="listings-card__main">
                <div className="listings-card__main-top">
                    <div className="h2 listings-card__title">{this.props.title}</div>
                    <div className="listings-card__address-line">
                    <div className="listings-card__street-address">{this.props.address}</div>
                    {/*eslint-disable-next-line*/}
                    </div><a className="link" href="javascript:void(0);">View Asset</a>
                </div>

                <div className="listings-card__main-bottom">
                    <div className="listings-card__buttons">
                        <a className="btn btn-primary" href="/assets_edit">Edit Asset</a>
                        {/*eslint-disable-next-line*/}
                        <a className="btn btn-default" href="javascript:void(0);">Copy Asset</a></div>
                </div>
            </div>
        </div>
    );
  }
}
  
export default AssetsItem;