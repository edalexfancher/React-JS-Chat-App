import React from 'react';
import './Color.css';
import { CirclePicker } from 'react-color';

export class Color extends React.Component {
  // constructor() {
  //   super();
  // }

  handleChange(color, event) {
    document.body.style.background = color.hex; 
  }

  render() {
    return(
      <div className="Color">
        <CirclePicker onChange={this.handleChange}/>
      </div>
    )
  }
}