import React from 'react';
import Modal from 'react-responsive-modal';

import './popups.sass';

class DeleteAssetModal extends React.Component {
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
    return (
      <div>
        {/*eslint-disable-next-line*/}
        <a className="link link-red" href="javascript:void(0);" onClick={this.onOpenModal} >Delete This Asset<i className="icon icon-delete-red icon-r"></i></a>

        <Modal 
          open={open} 
          onClose={this.onCloseModal} 
          center 
          showCloseIcon={false}
          classNames={{
            overlay: '',
            modal: 'customModal'
          }}
        >
                <div className="popup popup--default" id="delete-asset-popup">
                    {/*eslint-disable-next-line*/}
                    <a className="popup-close" href="javascript:void(0);" onClick={this.onCloseModal.bind(this)}></a>

                    <div className="popup__heading h1">Are you sure?</div>
                    <div className="popup__text">Do you really want to delete this asset?</div>
                    
                    {/*eslint-disable-next-line*/}
                    <div className="popup__button"><a className="btn btn-red js-popup-close" href="javascript:void(0);" >Yes, Delete Asset</a></div>

                    {/*eslint-disable-next-line*/}
                    <div className="popup__return-link"><a className="link js-popup-close" href="javascript:void(0);" onClick={this.onCloseModal.bind(this)}>&lt; No, return to Asset Editor</a></div>
                </div>
        </Modal>
      </div>
    );
  }
}


export default DeleteAssetModal;