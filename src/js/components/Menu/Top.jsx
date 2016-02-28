import React from 'react';
const Header = React.createClass({
	getInitialState: function() {
		return {
			menuOpen: false
		}
	},
	toggleMenu: function() {
		this.setState({menuOpen: !this.state.menuOpen});
	},
	render: function() {

		return (
			<div>
				<header className='row'>
					<h5 className='midnight location '> Westeria </h5>
					<h5 onClick={this.toggleMenu} className='midnight location'> {this.props.location || <div>loading</div>}
						{
							(()=>{
								if (this.state.menuOpen) {
									return (
										<div className='location-dropdown'>open menu</div>
									)
								} 
								return '';
							})()
						}
					</h5>
				</header>
				<hr className='top-line'/>
			</div>
		)
	}
});

export default Header;
