import React from 'react'
import Current from './Current'
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
                return <h1> FORECAST </h1>
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