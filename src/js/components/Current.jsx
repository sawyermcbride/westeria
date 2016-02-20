import React from 'react';
import {table} from '../utils';

const Current = React.createClass({

  render: function() {
    return (
      <section className='current-container'>
        <div className = 'current-display'>
          <h4 onClick = {this.props.toggleFormat}> {this.props.weather.temp + this.props.format} </h4>
          <i className={table[this.props.weather.icon]}></i>
        </div>
      </section>
    )
  }
});

export default Current;