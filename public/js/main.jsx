import React from 'react';
import ReactDOM from 'react-dom';
import Top from './components/Top';
import ajax from './ajax';
import Current from './components/Current';
import Weather from './components/Weather';
const App = React.createClass({
	getInitialState: function() {
		return {
			location: false,
			coords: false,
			currentWeather: false,
		}
	},
	getCoords: function(){

		return new Promise( (resolve, reject) => {
			navigator.geolocation.getCurrentPosition((pos) => {
				this.setState({coords: pos.coords});
				resolve();
			}, (err) => {
				reject(err);
			});
		});
	},
	componentDidMount: function() {

		this.getCoords().then( () => {
			let {longitude: long, latitude: lat} = this.state.coords;
			ajax.get('/l?long=' + long + '&lat=' + lat, (res) => {
				this.setState({location: res.addr});
			});

			ajax.get('/w?long=' + long + '&lat=' + lat, (res) => {
				this.setState({currentWeather: res.current, hourly: res.hours, days: res.days});
			});

		}).catch( (err) => {
			alert(err);	
		});
	},
	render: function() {
		return (
			<div>
				<header>
					<Top location = {this.state.location} />
				</header>
				<main>
					<Current currentWeather = {this.state.currentWeather} />
					<Weather />
				</main>
			</div>
		)
	}
});



ReactDOM.render(<App />, document.querySelector('#app'));
