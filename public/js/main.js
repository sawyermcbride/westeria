// Westeria visual weather app

// All modules have
// 1. init function which caches DOM and subscribes to events, this function is called 
// by the app module to load the functions
// 2. All modules have an elems object to store dom elements 
// 3. functions that respond to these subscribed events



//all the ajax calls go in her and events are fired to trigger
//the view updates

//utlity functions


var utils = {
	normalizeLocation: function(pos) {
		if(typeof pos === "object" && pos!== null &&) {
			if(!pos.keys.length) return "94950";
			
			return pos.longitude + '&' + pos.latitude;				
		}
		 else if (typeof pos === "string" && !pos) {
			return pos.trim().replace(/[A-Za-z]/,'');		 	
		 } 
	}
}

/**
* Location module
* public: 'get' takes a cb and and passes in the user location
*/
const location = (function () {
	//get the location
	const get = function (cb) {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success, error);
		}
		function error() {
			let l = prompt('Enter your zipcode');

			cb(l);
		
		}
		function success() {
			cb(pos);
		}
	}
	return {
		get: function(cb) }{
			get(cb)
		}
	}
}());
const currentWeather = (function(){
	let elems =  {}
	function init () {
		//when new weather is updated
		Events.subscribe('weather', _render);
		elems.template = $('template-weather-hourly');
		elems.canvas = $('#current-temp');
	} 
	function _render (data) {
		
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
		Events.subscribe('weather', _render);
		elems.template = $('#template-weather-days').html();
	}
	function buildObj (data) {
		let json = JSON.parse(obj);
		let o = {};

		for(let p in json) {
			if(json.hasOwnProperty(p)) {
				
			}
		}
	}
	function _render (data) {
		//formats the object to mustache can reder it
		let o = buildObj(data);
	}
	
	return {
		init: init
	}
})();
0

const App = (function (){
	var init = function() {
      //when the app loads we request the inital weather object from the server and tell the modules to render
      location.get(function(pos) {
      	if(!pos) return false;
      	let normalizedLocation = utils.normalizeLocation(pos);
	      $.ajax({
	      	method: 'GET',
	      	url: '/w/weather?l='+normalizedLocation,
	      	success: function(data) {
	      		Events.publish('weather', data)
	      	},
	      	error: function() {
	      		alert('could not get weather');
	      	}
	      });
      });
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