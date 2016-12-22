import React from 'react';
const Header = React.createClass({
	getInitialState: function() {
		return {
			menuOpen: false
		}
	},
	toggleMenu: function() {
		this.setState({menuOpen: !this.state.menuOpen});
    alert(this.state.menuOpen);
	},
	render: function() {

		return (
			<div>
				<header>
					<h5 className='midnight  '> Westeria </h5>
					<h5 onClick={this.toggleMenu} className='midnight location'> {this.props.location || <div>loading</div>}
					</h5>
				</header>
				<hr className='top-line'/>
			</div>
		)
	}
});

export default Header;
