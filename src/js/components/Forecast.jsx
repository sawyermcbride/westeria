import React from 'react';
import { table } from '../utils';
import HourTab from './HourTab';
const Forecast = React.createClass({
  getInitialState: function() {
    return {
        hourTab: '0',
    }
  },  
  convertTime (time) {
    if (time === 0)
      return '12 AM';
    else if (time >= 12) 
      return time-12 + ' PM';
    else 
      return time + ' AM';
  },
  switchHourTab: function(e) {
    let tab = e.target.dataset.tab;
    this.setState({hourTab: tab});
  },
  render: function () {
    let self = this;
    let hourSections = [];
    for (let i = 0; i < 2; i++) {
      let section =[];
      
      console.log(this.props.windowWidth);
      if (this.props.windowWidth < 700) {
        let index1 = i && 6; //use the i val if 0 (false) otherwise use 6 
        let index2 = i === 0 ? 6 : 13;
        section = this.props.hours.slice(index1, index2); 
      } else {
        let index1 = i && 9; //these variables would not work without block scoping
        let index2 = i === 0 ? 9 : 18;
        section = this.props.hours.slice(index1, index2);
      }
     
       hourSections[i] = section.map( (elem, index) => {
        return(
            <div className={'hour-node ' + (index%2 === 0 ? ' empty-background':'') } key={index}>
              <h3>{this.convertTime(elem.hour)}</h3>
              <h4>{elem.temp + this.props.format}</h4>
              <i className={table[elem.icon]}></i>
              <h5>{Math.round(elem.cloudCover * 10) + '% Cloud Cover'}</h5>
            </div>
        )
      });
      
    }
    return (
         <div>
            <h6>Hourly</h6>
            <HourTab switchHourTab = {this.switchHourTab} tab = {this.state.hourTab}/>
            <div className='hours-container'>
              {hourSections[parseInt(this.state.hourTab)]}
            </div>
        </div>
    )
  }
});
const Days = React.createClass({

  render: function() {
    let days = this.props.days.map( (elem, index) => {
      return (
        <div className='day-node'>
          <h4>{elem.day}</h4>
          <i className={table[elem.icon]}></i>
          <div className='temp-container'>
            <h4 className='temp-high'>{elem.tempMax + this.props.format}</h4>
            <h4 className='temp-low'>{elem.tempMin+ this.props.format}</h4>
          </div>
        </div>
      )
    });


    return (
      <div className='days-container'>
        {days}
      </div>
    )
  }
})
export default Forecast;