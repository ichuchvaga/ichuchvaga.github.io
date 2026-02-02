import React from 'react';
import Modal from 'react-responsive-modal';
import Checkbox from '../form/checkboxField/index';
import Filter from '../form/filter/filter';

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
        <a className="btn btn-primary" href="javascript:void(0);" onClick={this.onOpenModal}>Access Permissions</a>

        <Modal open={open} 
          onClose={this.onCloseModal} 
          center 
          showCloseIcon={false}
          classNames={{
            overlay: '',
            modal: 'customModal'
          }}
        >
                
            <div className="popup popup--default popup-template-permissions" id="access-permissions-popup">
                {/*eslint-disable-next-line*/}
                <a className="popup-close" href="javascript:void(0);" onClick={this.onCloseModal.bind(this)}></a>

                <div className="popup__heading h1">Access Permissions</div>
                <div className="popup__text">For Broker Template Modern 2018</div>

                <form className="popup__form">
                    <div className="form-fields">                        
                        <div className="checkboxes-inline">
                            <Checkbox
                                name="access_for[]"
                                label="Global"
                                checked={false}
                            />

                            <Checkbox
                                name="access_for[]"
                                label="Select Users"
                                checked={false}
                            />

                            <Checkbox
                                name="access_for[]"
                                label="Select Groups"
                                checked={false}
                            />                      
                        </div>

                        <Filter 
                            chips={['Dorian', 'Kyly']} 
                            label="Selected Users:" 
                            placeholder="Search By: Username" 
                            max="10" 
                            id="filter-widget1"
                        />

                        <Filter 
                            chips={['Brokers']} 
                            label="Selected Groups:" 
                            placeholder="Search By: Group Name" 
                            max="10" 
                            id="filter-widget2"
                        />

                        <div className="access-permissions-defaults">
                            <Checkbox
                                name="default_for_pitch_deck"
                                label="Make default for selected users/groups Pitch Deck"
                                checked={false}
                            />

                            <Checkbox
                                name="default_for_media_kit"
                                label="Make default for selected users/groups Media Kit"
                                checked={false}
                            />   
                        </div>
                                                                     
                    </div>
                </form>

                <div className="popup__actions">
                    {/*eslint-disable-next-line*/}
                    <div className="popup__actions-l"><a className="link" href="javascript:void(0);" onClick={this.onCloseModal.bind(this)}>&lt; No, return to Template Editor</a></div>

                    {/*eslint-disable-next-line*/}
                    <div className="popup__actions-r"><a className="btn btn-primary" href="javascript:void(0);">Save Permissions</a></div>
                </div>
            </div>
        </Modal>
      </div>
    );
  }
}


export default DeleteAssetModal;