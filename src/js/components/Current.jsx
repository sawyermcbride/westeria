import React from 'react';

const Current = React.createClass({
    render: function() {
      //TODO COMPUTATE LOGO
      console.log(this.props);
    return (
      <section className='current-container'>
        <div className='current'>
          <div>
            <h6 className='temp' onClick = {this.props.toggleFormat}>
              {this.props.currentWeather.temp + this.props.format}
             </h6>
            <i className='wi wi-day-sunny current-logo'></i>
          </div>
        </div>
      </section>
    )
  }
});

export default Current;
