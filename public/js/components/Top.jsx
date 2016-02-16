import React from 'react';
const Header = React.createClass({
	render: function() {
		console.log(this.props);
		return (
			<div>
				<h2> Westeria </h2>
				<h4> {this.props.location || 'loading'}</h4>
			</div>
		)
	}
});

export default Header;
