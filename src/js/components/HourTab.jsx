import React from 'react';

const HourTab = React.createClass({
    getInitialState: function() {
        return {
            tabNames: []
        }
    },
    componentWillMount: function() {
        this.setState({tabNames: this.props.tabNames});
        let hour = new Date().getHours();
        
        let diff = 24-hour;
        console.log(diff)
        if (diff > 18) {
          this.setState({tabNames: ['Morning','Afternoon'] });
        } else if (diff >= 10 ) {
          this.setState({tabNames: ['Today','Tonight'] });
        } else if (diff < 10) {
          this.setState({tabNames: ['Tonight','Early Tommorrow'] });
        } 
        
    },
    render: function() {
        console.log(this.state.tabNames);  
        return (
            <div className='hour-tab-container'>
                <input type='button' data-tab = '0' onClick={this.props.switchHourTab} className={this.props.tab === '0' ? 'hour-tab-selected' : ''} value={this.state.tabNames[0]}/>
                <input type='button' data-tab = '1' onClick={this.props.switchHourTab} className={this.props.tab === '1' ? 'hour-tab-selected' : ''} value={this.state.tabNames[1]}/>
            </div>        
        )
    }
});


export default HourTab;