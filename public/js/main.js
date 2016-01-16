// Westeria visual weather app



const menuBar = (function (){
  let elems = {};

  function init() {
    
  }
  
  return {
    init: init;
  }
})();


const App = (function (){
	var init = function() {
      Events.publish('ready');
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