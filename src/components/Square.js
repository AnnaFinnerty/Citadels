import React, {Component} from 'react';

import aStyles from '../scripts/aStyles';
import bStyles from '../scripts/bStyles';

import blue1 from '../images/blue1.png';
import blue2 from '../images/blue2.png';
import blue3 from '../images/blue3.png';
import blue4 from '../images/blue4.png';
import blue5 from '../images/blue5.png';
import blue6 from '../images/blue6.png';

import red1 from '../images/red1.png';
import red2 from '../images/red2.png';
import red3 from '../images/red3.png';
import red4 from '../images/red4.png';
import red5 from '../images/red5.png';
import red6 from '../images/red6.png';

class Square extends Component {
  constructor(props){
      super(props);
  }
  render(){
      console.log("SQUARE PROPS");
      console.log(this.props);
      
      const value = this.props.value;
      const team = this.props.team;
      const blue_images = [blue1,blue1,blue2,blue3,blue4,blue5,blue6];
      const red_images = [red1,red1,red2,red3,red4,red5,red6];
      let image_collection;
      if(this.props.team===aStyles){
          image_collection = blue_images;
      } else {
          image_collection = red_images;
      }
      
      const image = image_collection[value];
      
      const style = {
          backgroundColor: this.props.team[this.props.value],
          backgroundImage: `url(${image})`,
          backgroundSize: 'contain',
      }
      
      return (
        <button className="square" onClick={this.props.onClick} style = {style}  >
          {this.props.value}
        </button>
      );
  }
}

export default Square;
