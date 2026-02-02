import React, { Component } from 'react';

import createAbsoluteGrid from 'react-absolute-grid';
import Page from './item';
import Data from './data';
import * as _ from 'lodash';

import './pages.sass';

let gridItems = Data;
let zoom = 1;

// Pass your display component to create a new grid
const AbsoluteGrid = createAbsoluteGrid(Page, {});

class Pages extends Component {
  constructor(props) {
    super(props);

    this.onMove = this.onMove.bind(this);
    this.onMoveDebounced = _.debounce(this.onMove, 40);

    this.state = {
      itemWidth: 0,
      itemHeight: 0
    };

    this.getDOMWidth = this.getDOMWidth.bind(this);
  }

  onMove(source, target) {
    source = _.find(gridItems, {key: parseInt(source, 10)});
    target = _.find(gridItems, {key: parseInt(target, 10)});

    const targetSort = target.sort;

    gridItems = gridItems.map(function(item){
      //Decrement sorts between positions when target is greater
      if(item.key === source.key) {
        return {
          ...item,
          sort: targetSort
        }
      } else if(target.sort > source.sort && (item.sort <= target.sort && item.sort > source.sort)){
        return {
          ...item,
          sort: item.sort - 1
        };
      //Increment sorts between positions when source is greater
      } else if (item.sort >= target.sort && item.sort < source.sort){
        return {
          ...item,
          sort: item.sort + 1
        };
      }
      return item;
    });
    this.forceUpdate();

  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(this.getDOMWidth);
    } else {
      setTimeout(this.getDOMWidth, 66);
    }
  }

  getDOMWidth () {
    let container = document.querySelector("#pages");
    const width = container && container.clientWidth;

    let itemsNumber = 5;

    if (Math.ceil(width) < 1200) {
      itemsNumber = 3;
    }
    
    if (Math.ceil(width) < 550) {
      itemsNumber = 2;
    }

    const itemWidth = Math.floor((width - 14) / itemsNumber);
    const itemHeight = itemWidth * 1.295964125560538;

    if(this.state.itemWidth !== itemWidth){
      this.setState({
        itemWidth: itemWidth,
        itemHeight: itemHeight
      });
    }
  }


  render(){
      return (
          <div className="pages-grid">
              <div className="pages-grid__title">Pages:</div>

              <div className="pages-grid__in">
                  <AbsoluteGrid 
                      items={gridItems} 
                      responsive={true} 
                      dragEnabled={true}
                      itemWidth={this.state.itemWidth} 
                      itemHeight={this.state.itemHeight}
                      onMove={this.onMoveDebounced}
                      zoom={zoom}
                      verticalMargin={20}
                  />                 
              </div>
          </div>
      )
  }
}

export default Pages;