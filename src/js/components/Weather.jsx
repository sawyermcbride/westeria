import React from 'react';

const Weather = React.createClass({
  getIcon: function(str) {
    const table = {
      '':''
    }

    return table[str];
  },
  render: function() {
    console.log(this.props);
    let slicedHours = this.props.hours.slice(0, 6);
    let hourly = slicedHours.map( (obj, index) => {
      let hour = obj.hour;

      if (hour == 0) hour = 12;
      else if (hour > 12) hour-=12;
      console.log(hour);
      return (
        <div className = 'hour-node' key={index}>
          <h6 className = 'hour-time'>{hour + (obj.hour > 12 ? ' PM' : ' AM') }</h6>
          <h6 className='hour-temp'>{obj.temp + this.props.format}</h6>
          <i className = 'hour-icon wi wi-day-cloudy'></i>
        </div>
      )
    });

    return (
      <div>
        <section className='hour-container'>
          {hourly}
        </section>
        <h6 className='title'>Beyond</h6>
        <Daily daily={this.props.days} format={this.props.format} />
      </div>
    )
  }
});

const Daily = React.createClass({

  render: function() {
    let slicedDaily = this.props.daily.slice(1,this.props.daily.length);
    let daily = slicedDaily.map((obj, index) => {
      return (
        <div className='day-node' key={index}>
          <h6 className='day'>{obj.day}</h6>
          <div>
            <i className='wi wi-day-cloudy'></i>
          </div>
          <div className='temp-container'>
            <h6 className='temp-max'>{obj.tempMin +this.props.format}</h6>
            <h6 className='temp-min'>{obj.tempMax +this.props.format}</h6>
          </div>
        </div>
      )
    });
    return (
      <section className='daily-container'>
        {daily}
      </section>
    )
  }

});

export default Weather;
