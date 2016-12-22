import React from 'react';


const SwitchTab = React.createClass({
	toggleTab: function(e) {
		let clicked = e.target.dataset.index;
	    this.props.triggerSwitchTab(clicked);
	    console.log(this.props);
	},

	render: function() {
		return (
			<div className='tab-container'>
				<input onClick={this.toggleTab} className={this.props.tab === 1 ? 'tab-selected':''} type='button' data-index='1' value='Current' />
				<input onClick={this.toggleTab} className={this.props.tab === 2 ? 'tab-selected':''} type='button' data-index='2' value='Forecast' />
				<input onClick={this.toggleTab} className={this.props.tab === 3 ? 'tab-selected':''} type='button' data-index='3' value='Visualize' />
      </div>
		)
	}
});

export default SwitchTab;
