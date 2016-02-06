'use strict';
const menu = (function() {
	let elems = {};
	function _cacheDom() {
		elems.nav = $('nav');
		elems.location = elems.nav.find('#location');
		elems.signIn = elems.nav.find('#btn-signin');
		elems.signUp = elems.nav.find('#btn-join');
	}

	function _bindEvents () {

    }
	function init () {
		_cacheDom();
		_bindEvents();
	}

	function renderLocation ( location ) {
		elems.location.html(location);
	}

	return {
		renderLocation,
		init
	}

})();

const metaInfo = (function() {
  let getLocation = new Promise( (resolve, reject) => {
    if(!navigator.getloocation) reject("Location is not available, try entering your zip code manually");
    navigator.getLocation.getCurrentPosition( (pos) => {
      resolve(pos.coords.latitude, pos.coords.longitude);
    },(error) => {
      reject(error);
    }); 
  });
  return {
    getLocation,
  }
})();

const currentWeather = (function () {
	let elems = {};

	function _cacheDom () {
		elems.container = $('section.current');
		elems.currentContainer = elems.container.find('.current-now');
		//we can't store the canvas in a jquery object because it does not have
		// the getContext element in the canvas node
		elems.canvas = document.querySelector('canvas#current-temp');
		elems.hourlyContainer = elems.container.find('.current-hourly');
		elems.template = $('#template-weather-hourly');
	}
	function _bindEvents () {
		//bind
	}
	function init () {
		_cacheDom();
		_bindEvents();
	}
	function renderAll (data) {
		renderHours(data);
		//render the rest of the future 
	}

	function renderHours (data) {
		//get only the first few days
		data.data = data.data.slice(0,4);

		let template = elems.template.html();
		console.log(template)
		let out = Mustache.render(template, data);
		//append the rendered html from mustache
		elems.hourlyContainer.append(out);

	}
	//canvas
	function renderTemp (temp) {
		if(typeof temp === 'object') {
			console.error('Canvas temp must be a integer');
			return false;
		}
		console.log(elems.canvas);
		let ctx = elems.canvas.getContext('2d');
		elems.canvas.height = 200;
		elems.canvas.width = 400;
		ctx.font = "20px Arial";
		ctx.fillText(temp,100,30);
	}

	return {
		renderAll,
		renderHours,
		init,
		renderTemp
	}

})();

const futureWeather = (function () {
	let elems = {};
	
    function cacheDom () {
		elems.container = $('.future-days');
		elems.template = $('#template-weather-days');
	}
	function render (data) {
		let template = elems.template.html();
		let out = Mustache.render(template, data);
		elems.container.append(out);
	}
	function init () {
		cacheDom();
	}

	return {
		init,
		render
	}
})();


$(document).ready(function() {
	menu.init();
	currentWeather.init();
	futureWeather.init();
    
    metaInfo.getLocation().then((lat, long) => {
		$.ajax({
			url: 'https://api.forecast.io/forecast/311b8f1ba7fb57a38aaf771086360d88/' + lat + ',' + long,
			jsonp: 'callback',
			dataType: 'jsonp',
			success: function(data) {
				console.log(data);
				menu.renderLocation(data.longitude +','+ data.latitude);
				currentWeather.renderHours(data.hourly);
				currentWeather.renderTemp(data.currently.temperature);
				futureWeather.render(data.daily);
			}

		});
    }, (err) => {
      alert('couldn\'t get locaiton')
    });
	// navigator.geolocation.getCurrentPosition(function(pos) {
});