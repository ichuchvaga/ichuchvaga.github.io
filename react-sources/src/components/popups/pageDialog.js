import React from 'react';
import PageModal from 'react-responsive-modal';

import './popups.sass';

class PagePreviewModal extends React.Component {
  state = {
    open: false,
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const caption = this.props.caption || '';

    return (
      <div>
        {/*eslint-disable-next-line*/}
        <a className="preview-button" href="javascript:void(0);" onClick={this.onOpenModal} onTouchStart={this.onOpenModal} title={this.props.title}>
          <i className="icon"></i>
        </a>

        <PageModal 
          open={open} 
          onClose={this.onCloseModal} 
          center 
          showCloseIcon={false}
          classNames={{
            overlay: '',
            modal: 'customModal'
          }}
        >
          <div className="popup popup--template-img popup-template-pages">
            
            {/*eslint-disable-next-line*/}
            <a className="popup-close-button-whitebox" href="javascript:void(0);" onClick={this.onCloseModal.bind(this)}></a>

            <div className="popup-page-img">
              <img src={this.props.img} alt={this.props.caption} />
            </div>
            <div className="popup-page-caption">{caption}</div>

          </div>

        </PageModal>
      </div>
    );
  }
}


export default PagePreviewModal;