import React from 'react';
import ReactDOM from 'react-dom';
import Top from './components/Menu/Top';
import ajax from './ajax';
import MainWeather from './components/MainWeather';
import SwitchTab from './components/Menu/SwitchTab';

const App = React.createClass({
	getInitialState: function() {
		return {
			location: false,
			coords: false,
			current: false,
			fahrenheit:true,
			hours: [],
			days: [],
      tab: 1
		}
	},
	getCoords: function() {

		return new Promise( (resolve, reject) => {

			if (localStorage.getItem('lat')) {
				let obj = {
					latitude: localStorage.getItem('lat'),
					longitude: localStorage.getItem('long')
				}
				this.setState({coords: obj});
				return resolve();
			}

			navigator.geolocation.getCurrentPosition((pos) => {
				localStorage.setItem('long', pos.coords.longitude);
				localStorage.setItem('lat', pos.coords.latitude);
				this.setState({coords: pos.coords});
				return resolve();
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
		let current = this.state.current;
		current.temp = this.convertTemp(current.temp);

		//update new stat props
		this.setState({fahrenheit: !this.state.fahrenheit, current,days,hours});
		console.log(this.state);
	},
  updateInfo: function () {

		this.getCoords().then( () => {
      /**
       * ALl the below code does is descide if the information exists in the localstorage
       * of the browser already. If the time has expired ( 3 min refresh) or its the first time
       * then we make an ajax request for the info and store it in the local storage for future
       * use. 
       */
			let {longitude: long, latitude: lat} = this.state.coords;
			//see if it's already in the localStorage to avoid server call
			if (localStorage.getItem('addr')) {
				this.setState({location: localStorage.getItem('addr')});
			} else {
				ajax.get('/l?long=' + long + '&lat=' + lat, (res) => {
					localStorage.setItem('addr', res.addr);
					this.setState({location: res.addr});
				});
			}
			if (localStorage.getItem('weather') && new Date().getTime() - localStorage.getItem('lastRefresh') < 300000 ) {
				let { current, hours, days } = JSON.parse(localStorage.getItem('weather'));
				this.setState({current: current, hours, days});
			} else {
				ajax.get('/w?long=' + long + '&lat=' + lat, (res) => {
					localStorage.setItem('weather', JSON.stringify(res));
					localStorage.setItem('lastRefresh', new Date().getTime());
					this.setState({current: res.current, hours: res.hours, days: res.days});
				});
			}

		}).catch( (err) => {
      console.error(err);
			alert('An Error Has Occured: We Have Been Notified. Sorry!: ' + err);
		});
	},
	componentDidMount: function() {
		this.updateInfo();
	},
  switchTab: function(num) {
    if (num > 3) throw new Error('Tab Does Not Exist');
    
    //the num comes in from an html prop that is a string, we want an int
    this.setState({tab: parseInt(num)});
  },
	render: function() {

    let content; 
    let degree = String.fromCharCode(176);
    /**
     * The days and hours arrays are state properties and empty initials. When the info
     * is loaded we load them, otherwise the loading icon is displayed.
     */
		return (
			<div className='container'>
				<Top location = {this.state.location}/>
        <SwitchTab  triggerSwitchTab = {this.switchTab} tab={this.state.tab} />
        {/*IIFE: returns component depending on tab and loading status*/}

        {
          (()=> {
            console.log(this.state.current);
            if (!(this.state.days.length && this.state.hours.length)) {
              return <div className='loader'></div>
            } else {
              return <MainWeather 
                    toggleFormat = {this.toggleFormat}
                    format = {degree + (this.state.fahrenheit ? 'F':'C')}
                    current={this.state.current}
                    hours={this.state.hours} 
                    days={this.state.days}
                    tab = {this.state.tab} 
                  />              
            }
          })()
        }
      </div> 
		)
	}
});



ReactDOM.render(<App />, document.querySelector('#app'));
