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
	publish : function (evt) {
		if (!this.evts.hasOwnProperty(evt)) return false;
		/**
		* loop through all of the functions that have been subscribed to this event (they are in the array) and execute them
		*/
		this.evts[evt].forEach(function(fn) {
			fn();
		});
	} 
}