import React, { Component } from 'react';
import Filter from '../../form/filter/filter';
import UploadWidget from '../../form/uploadField/index';
import InputField from '../../form/inputField/index';
import Dropdown from '../../form/selectField/index';
import Popup from '../../popups/deleteAssetDialog';

class EditAsset extends Component {

  render() {
    return (
      <div className="page-content">
        <div className="container">
          <div className="wrapper-md">
              <h1>Create / Edit Admin Asset</h1>
              <form className="form edit-form" action="/assets">
      
                  <div className="form-fields">

                      <InputField
                            label="Asset Name:"
                            placeholder="ex: Elegant Residency Media Kit"
                            name="asset_name"
                            id="asset_name"
                            value=""
                      />

                      <InputField 
                            label="Listing Address (or Property Name):"
                            placeholder=""
                            name="address"
                            id="address"
                            value=""
                      />
      
                      <UploadWidget />

                      <Dropdown 
                        label="Template:"
                        hasLink={true}
                        linkUrl="/templates"
                        linkText="Manage Templates"
                        name="template_name"
                        id="template_name"
                        value="Broker Template Modern 2018"
                        options={[
                          "Broker Template Modern 2018",
                          "Broker Template Classic 2018",
                          "Broker Template International 2018"
                        ]}
                      />
      
                      <Filter 
                        chips={['admin', 'members']} 
                        label="Create Asset for Specific User/Group:" 
                        placeholder="Search By: Username or Group Name" 
                        max="10" 
                        id="filter-widget1" 
                      />
      
                  </div>        
      
              <div className="form-bottom-actions clearfix">
                  <div className="form-bottom-actions__l">
                    <a className="link" href="/assets">&lt; Return to All Admin Assets</a>
                  </div>

                  
                  <div className="form-bottom-actions__r">
                    {/*eslint-disable-next-line*/}
                    <Popup />
                  </div>
              </div>

              <div className="form-buttons text-left">
                  {/*<button className="btn btn-primary" type="submit">Save Asset</button>*/}
              </div>
              </form>

              

          </div>
        </div>
    </div>
    );
  }
}
  
export default EditAsset;