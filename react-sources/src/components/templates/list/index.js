import React, { Component } from 'react';
import Data from './data.json';
import TemplateCard from './templatesItem';
import TemplatesForm from './templatesForm';
import './listings.sass';

class TemplatesLists extends Component {
  render() {
    //console.log(Data);

    const imgPath = 'src/img/templates/';

    return (
      <div className="page-content templates-page">
        <div className="container">
          <div className="wrapper-md">
            <h1>Admin Templates</h1>

            <div className="listings-button-line text-center">
              <a className="btn btn-primary" href="/templates_edit">Create New Template</a>
            </div>

            <TemplatesForm />

            <div className="listings">

              {
                Data.map(function(val, index, arr){
                  return <TemplateCard 
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
  
export default TemplatesLists;