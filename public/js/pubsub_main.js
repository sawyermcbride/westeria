// Westeria visual weather app

'use strict';
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
//Main App Below

/**************************************************************************************/

(function(w,document, undefined){
	const utils = {
		normalizeLocation: function(pos) {
			if(typeof pos === "object" && pos!== null ) {
				if(!pos.keys.length) return "94950";
				
				return pos.longitude + '&' + pos.latitude;				
			}
			 else if (typeof pos === "string" && !pos) {

				return pos.trim().replace(/[A-Za-z]/,'');		 	
			 } 
		}
	}

	Events.subscribe('loaded', function () {
		if( navigator.geolocation ) {
			navigator.geolocation.getCurrentPosition(function(pos) {
				console.log(pos.coords);
				$.ajax({
					method: 'GET',
					url: '/w?l='+pos.coords.latitude+'&'+pos.coords.longitude,
					success: function (data) {
						Events.publish('weather', data);
					},
					error :function () {
						alert('Oops, connection gone bad. Check your wifi/LTE connection.');
					}
				});
			});
		}

	});



	Events.subscribe('weather', function (data) {
		let hourTemplate = $('#template-weather-hourly').html();
		let hourContainer = $('.current-hourly');

		let out = Mustache.render(hourTemplate, data);
		hourContainer.append(out);
		alert(out);

		let daysTemplate = $('#template-weather-days').html();
		let daysContainer = $('.future-days');

		// data.days.forEach(function(elem,index) {
		// 	new dayPanel({
		// 		day: elem.day,
		// 		index: index
		// 	}).render();
		// });


	});

	




	$(document).ready(function(){
		Events.publish('loaded');
	});

})(this, document)
