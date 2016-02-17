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
			fahrenheit:true,
			hours: [],
			days: []
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
	convertTemp: function(temp)  {
		return this.state.fahrenheit ? Math.round((temp-32)*(5/9)) : Math.round(temp*(9/5)+32);
	},
	toggleFormat: function() {

		//loop through the weather object and convert
		let hours = this.state.hours.map((elem) => {
			let obj = elem;
			obj.temp = this.convertTemp(obj.temp);
			return obj;
		});
		let days = this.state.days.map((elem) => {
			let obj = elem;
			obj.tempMin = this.convertTemp(obj.tempMin);
			obj.tempMax = this.convertTemp(obj.tempMax);
			return obj;
		});
		let currentWeather = this.state.currentWeather;
		currentWeather.temp = this.convertTemp(currentWeather.temp);

		//update new stat props
		this.setState({fahrenheit: !this.state.fahrenheit, currentWeather,days,hours});
		console.log(this.state);
	},
	componentDidMount: function() {

		this.getCoords().then( () => {
			let {longitude: long, latitude: lat} = this.state.coords;
			ajax.get('/l?long=' + long + '&lat=' + lat, (res) => {
				this.setState({location: res.addr});
			});

			ajax.get('/w?long=' + long + '&lat=' + lat, (res) => {
				this.setState({currentWeather: res.current, hours: res.hours, days: res.days});
			});

		}).catch( (err) => {
			alert(err);
		});

	},
	render: function() {
		let content;
		if (this.state.days.length && this.state.hours.length) {
			content = (
				<div>
					<h6 className='title'>Now</h6>
					<Current
					 	currentWeather = {this.state.currentWeather}
						toggleFormat={this.toggleFormat}
						format= {String.fromCharCode(176) + (this.state.fahrenheit ? 'F' : 'C')}
					/>

					<h6 className='title'> Today</h6>
					<Weather
					 	hours = {this.state.hours}
			 			days = {this.state.days}
						format= {String.fromCharCode(176) + (this.state.fahrenheit ? 'F' : 'C')}
					/>
				</div>
			)
		} else {
			content = <div className='loader'></div>
		}
		return (
			<div className='container'>
				<Top location = {this.state.location}/>
				{content}
			</div>
		)
	}
});



ReactDOM.render(<App />, document.querySelector('#app'));
