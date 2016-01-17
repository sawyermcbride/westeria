// Westeria visual weather app




class dayPanel () {
	constructor(config) {
		this.id = config.index;
		this.container = config.container || $('.future-days');
		this.day = config.day;
	}

	render () {
		var out = Mustache.render('<div class="panel"><h5 class="day">day</h5></div>');
	}
}



(function(w,document, undefined){
	const utils = {
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

	Events.subscribe('loaded', function () {

		if( navigator.geolocation ) {
			navigator.geolocation.getCurrentPosition(function(pos) {
				$.ajax({
					method: 'GET',
					url: '/w?l='pos.latitude+'&'pos.longitude,
					success: function (data) {
						Events.publish('weather', data);
					}
				});
			});
		}

	})();



	Events.subscribe('weather', function (data) {
		let hourTemplate = $('#template-weather-hourly').html();
		let hourContainer = $('.current-hourly');

		let daysTemplate = $('#template-weather-days').html();
		let daysContainer = $('.future-days');

		data.days.forEach(function(elem,index) {
			new dayPanel({

			}).render();
		});


	});

	




	$(document).ready(function(){
		Events.publish('loaded');
	})();
})(this, document)

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