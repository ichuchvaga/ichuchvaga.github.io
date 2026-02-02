import React from 'react';
import Modal from 'react-responsive-modal';

import './popups.sass';

class DeleteTemplateModal extends React.Component {
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
        <a className="link link-red" href="javascript:void(0);" onClick={this.onOpenModal} >Delete This Template<i className="icon icon-delete-red icon-r"></i></a>

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
                <div className="popup popup--default popup-template-delete" id="delete-template-popup">
                    {/*eslint-disable-next-line*/}
                    <a className="popup-close" href="javascript:void(0);" onClick={this.onCloseModal.bind(this)}></a>

                    <div className="popup__heading h1">Are you sure?</div>
                    <div className="popup__text">Do you really want to delete this template?<br/>The following users/groups will be affected:<br/><strong>Brokers, User123, User484</strong></div>
                    
                    {/*eslint-disable-next-line*/}
                    <div className="popup__button"><a className="btn btn-red" href="javascript:void(0);">Yes, Delete Template</a></div>

                    {/*eslint-disable-next-line*/}
                    <div className="popup__return-link"><a className="link" href="javascript:void(0);" onClick={this.onCloseModal.bind(this)}>&lt; No, return to Template Editor</a></div>
                </div>
        </Modal>
      </div>
    );
  }
}


export default DeleteTemplateModal;