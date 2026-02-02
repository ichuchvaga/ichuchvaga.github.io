import React, { Component } from 'react';

class TemplatesItem extends Component {
  render() {
      //console.log(this.props);

    return (
        <div className="listings-card">
            <div className="listings-card__img" style={{backgroundImage:'url("'+this.props.img+'")'}}></div>

            <div className="listings-card__main">
                <div className="listings-card__main-top">
                    <div className="h2 listings-card__title">{this.props.title}</div>
                    {/*eslint-disable-next-line*/}
                    <a className="link" href="javascript:void(0);">View Template</a>
                </div>

                <div className="listings-card__main-bottom">
                    <div className="listings-card__buttons">
                        <a className="btn btn-primary" href="/templates_edit">Edit Template</a>
                        {/*eslint-disable-next-line*/}
                        <a className="btn btn-default" href="javascript:void(0);">Copy Template</a></div>
                </div>
            </div>
        </div>
    );
  }
}
  
export default TemplatesItem;