import React from 'react';
const Header = React.createClass({
	render: function() {
		console.log(this.props);
		return (
			<div>
				<header className='row'>
					<h5 className='midnight col-md-6'> Westeria </h5>
					<h5 className='midnight col-md-3'> {this.props.location || <div>loading</div>}</h5>
				</header>
				<hr className='top-line'/>
			</div>
		)
	}
});

export default Header;
