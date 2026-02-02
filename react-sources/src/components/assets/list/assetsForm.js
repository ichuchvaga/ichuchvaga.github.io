import React, { Component } from 'react';
import SearchField from '../../form/searchField/index';

class AssetsForm extends Component {
  render() {
    return (
        <form className="form listings-form">
            <div className="form-fields">
                <div className="row">
                    <div className="col-md-12">
                        <SearchField 
                            label="Search Assets:"
                            placeholder="Search By: Asset Name"
                            name="search-input"
                            id="search-input"
                            value=""
                        />
                    </div>
                </div>
            </div>
        </form>
    );
  }
}
  
export default AssetsForm;