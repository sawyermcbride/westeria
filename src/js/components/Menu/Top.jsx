import React from 'react';
const Header = React.createClass({
	render: function() {
		return (
			<div>
				<header className='row'>
					<h5 className='midnight location '> Westeria </h5>
					<h5 className='midnight location'> {this.props.location || <div>loading</div>}</h5>
				</header>
				<hr className='top-line'/>
			</div>
		)
	}
});

export default Header;
