import React from 'react'
import Current from './Current'
import Forecast from './Forecast';

const MainWeather = React.createClass({

  render: function() {
    return (
      <div className='main-container'>
        {/*IIFE that looks weird: returns a react componentt based on tab*/}
        {(()=>{
            switch (this.props.tab) {
              case 1: 
                return <Current 
                          toggleFormat = {this.props.toggleFormat} 
                          weather={this.props.current}
                          format={this.props.format}
                        />
              break;
              case 2: 
                return <Forecast
                          windowWidth = {this.props.windowWidth}
                          hours = {this.props.hours}
                          days = {this.props.days} 
                          format={this.props.format}
                        />
              break;
              case 3:
                return <h1>Cool Visualization</h1>
              break; 
            }
          })()
        }
      </div>
    )
  }
});

export default MainWeather;