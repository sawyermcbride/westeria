// Westeria visual weather app

// All modules have
// 1. init function which caches DOM and subscribes to events, this function is called 
// by the app module to load the functions
// 2. All modules have an elems object to store dom elements 
// 3. functions that respond to these subscribed events


const menuBar = (function (){
  let elems = {};

  function init() {    
    elems.location = $('nav #location-title');
    elems.signin = $('btn-signin');
    elems.join = $('btn-join');

    location

  }

  function location (){
  	if( navigator.geolocation ){
  		navigator.geolocation.getCurrentPosition(success, error);

  		function success ( pos ) {
  			localStorage.set('location', {
  				latitude: pos.latutude,
  				logitude: pos.longitude
  			})
  		}

  		function error () {
  			//shitty, change to custom text box
  			var zip = prompt('We could\'t get your location, would you enter your zip code?');
  			if(zip) {
  				//ajax latitude/longitude from zip and set local storage
  			} else {
  				// default
  			}
  		}
  	}
  }
  

  function render(data) {
  	elems.location.html(data.location);
  }
  return {
  	init: init;
  }
})();

const currentWeather = (function(){
	let elems =  {}
	function init () {
		Events.subscribe('refresh', load);
		elems.template = $('template-weather-hourly');
		elems.canvas = $('#current-temp');
	} 
	function load () {
		//AJAX Get current weather  
	}
	function _render (data) {
		var template = 
	}
	function _renderCanvas () {
		//DRaw canvas with temperature
	}
	return {
		init: init
	}
})();

const dayWeather = (function() {
	let elems = {};

	function init () {
		Events.subscribe('refresh', load);
		elems.template = $('#template-weather-days');
	}

	function load () {
		//AJAX
		_render();
	}

	function _render (data) {
		//mustache template 
	}
	
	return {
		init: init
	}
})();


const App = (function (){
	var init = function() {
      menuBar.init();
	}
	return {
		init: init
	}
}();

$(document).ready(App.init);




/**
 * Simple custom pubsub for app
 */
var Events = {
	evts :[],
	subscribe : function (evt, callback) {
		/**
		* We check if the event has already been cretted and if it has not,
		* create a new array of subscribed functions
		*/
		if (!this.evts.hasOwnProperty(evt)) {
			this.evts[evt] = [];
		} 
		//push to the arr of subscribed functions	
		this.evts[evt].push(callback);
	},
	publish : function (evt, data) {
		if (!this.evts.hasOwnProperty(evt)) return false;
		/**
		* loop through all of the functions that have been subscribed to this event (they are in the array) and execute them
		*/
		this.evts[evt].forEach(function(fn) {
			fn(data);
		});
	} 
}