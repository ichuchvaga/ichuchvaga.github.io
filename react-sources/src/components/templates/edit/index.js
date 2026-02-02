import React, { Component } from 'react';
import Filter from '../../form/filter/filter';
import SearchField from '../../form/searchField/index';
import InputField from '../../form/inputField/index';
import Dropdown from '../../form/selectField/index';
import Checkbox from '../../form/checkboxField/index';
import ColorDropdown from '../../form/colorDropdown/colorDropdown';

import Popup from '../../popups/deleteTemplateDialog';
import PermissionsPopup from '../../popups/accessPermissionsDialog';

import Pages from '../pages/index.js';
import './edit.sass';

class EditTemplate extends Component {
  render() {
    return (
      <div className="page-content">
        <div className="container">
          <div className="wrapper-lg">
              <h1>Create / Edit Admin Template</h1>
              <form className="form edit-form template-edit-form" action="/assets">
      
                  <div className="form-fields">

                    <div className="template-params">
                      <div className="template-params__name">
                        <InputField 
                            label="Template Name:"
                            placeholder="My Amazing Template"
                            name="template_name"
                            id="template_name"
                            value=""
                        />                        
                      </div>

                      <div className="template-params__theme">
                        <Dropdown 
                          label="Template Theme:"
                          hasLink={false}
                          linkUrl=""
                          linkText=""
                          name="template_theme"
                          id="template_theme"
                          value="Modern Theme"
                          options={[
                            "Modern Theme",
                            "Classic Theme",
                            "International Theme"
                          ]}
                        />
                      </div>

                      <div className="template-params__color">
                        <ColorDropdown 
                          name="template_bg"
                          id="template_bg"
                          label="Background Color:"
                          options={[
                            "#372E5E",
                            "#3468C6",
                            "#2AFF84"
                          ]}
                          value="#372E5E"
                        />                        
                      </div>

                      <div className="template-params__button">
                        {/*eslint-disable-next-line*/}
                        <PermissionsPopup />
                      </div>

                    </div>

                    <SearchField 
                        label="Search Page:"
                        placeholder="Search By: Page Name"
                        name="search-input"
                        id="search-input"
                        value=""
                    />

                    <Filter chips={['admin', 'members']} label="Filter Pages by Users/Groups:" placeholder="Filter Pages by Users/Groups" max="10" id="filter-widget1" />

                    <Checkbox
                      name="hide_unpicked_pages"
                      label="Hide Unpicked Pages"
                      checked={false}
                    />

                    <div id="pages">
                      <Pages />
                    </div>                   
               
                  </div>
      
                  <div className="form-bottom-actions clearfix">
                      <div className="form-bottom-actions__l">
                        <a className="link" href="/templates">&lt; Return to Admin Templates</a>
                      </div>
                      
                      <div className="form-bottom-actions__r">
                        <Popup />                        
                      </div>
                  </div>

                  <div className="form-buttons text-left">
                      <button className="btn btn-primary" type="submit">Save Template</button>
                  </div>
              </form>
          </div>
        </div>
    </div>
    );
  }
}
  
export default EditTemplate;