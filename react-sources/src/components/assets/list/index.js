import React, { Component } from 'react';
import Data from './data.json';
import AssetCard from './assetsItem';
import AssetsForm from './assetsForm';

import './listings.sass';

class AssetsLists extends Component {
  render() {    
    const imgPath = 'src/img/assets/';

    return (
      <div className="page-content">
        <div className="container">
          <div className="wrapper-md">
            <h1> Admin Assets</h1>

            <div className="listings-button-line text-center">
              <a className="btn btn-primary" href="/assets_edit">Create New Asset</a>
            </div>

            <AssetsForm />

            <div className="listings">

              {
                Data.map(function(val, index, arr){
                  return <AssetCard 
                    title={val.title}
                    address={val.address}
                    img={imgPath + val.img}
                    key={index}
                  />
                })
              }

            </div>


          </div>
        </div>
      </div>
    );
  }
}
  
export default AssetsLists;
