import React from 'react';

const Current = React.createClass({
  render: function() {
    return (
      <section>
        {this.props.currentWeather ? <h5> {this.props.currentWeather.temp} </h5> : 'loading'}
      </section>
    )
  }
});

export default Current;
