'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var menu = function () {
	var elems = {};
	function _cacheDom() {
		elems.nav = $('nav');
		elems.location = elems.nav.find('#location');
		elems.signIn = elems.nav.find('#btn-signin');
		elems.signUp = elems.nav.find('#btn-join');
	}

	function _bindEvents() {}
	function init() {
		_cacheDom();
		_bindEvents();
	}

	function renderLocation(location) {
		elems.location.html(location);
	}

	return {
		renderLocation: renderLocation,
		init: init
	};
}();

var metaInfo = function () {
	var getLocation = new Promise(function (resolve, reject) {
		//    if(!navigator.geolocation) reject("Location is not available, try entering your zip code manually");
		navigator.geolocation.getCurrentPosition(function (pos) {
			resolve(pos.coords.latitude, pos.coords.longitude);
		}, function (error) {
			resolve('Corte madera, sa');
		});
	});
	return {
		getLocation: getLocation
	};
}();

var currentWeather = function () {
	var elems = {};

	function _cacheDom() {
		elems.container = $('section.current');
		elems.currentContainer = elems.container.find('.current-now');
		//we can't store the canvas in a jquery object because it does not have
		// the getContext element in the canvas node
		elems.canvas = document.querySelector('canvas#current-temp');
		elems.hourlyContainer = elems.container.find('.current-hourly');
		elems.template = $('#template-weather-hourly');
	}
	function _bindEvents() {
		//bind
	}
	function init() {
		_cacheDom();
		_bindEvents();
	}
	function renderAll(data) {
		renderHours(data);
		//render the rest of the future
	}

	function renderHours(data) {
		//get only the first few days
		data.data = data.data.slice(0, 4);

		var template = elems.template.html();
		console.log(template);
		var out = Mustache.render(template, data);
		//append the rendered html from mustache
		elems.hourlyContainer.append(out);
	}
	//canvas
	function renderTemp(temp) {
		if ((typeof temp === 'undefined' ? 'undefined' : _typeof(temp)) === 'object') {
			console.error('Canvas temp must be a integer');
			return false;
		}
		console.log(elems.canvas);
		var ctx = elems.canvas.getContext('2d');
		elems.canvas.height = 200;
		elems.canvas.width = 400;
		ctx.font = "20px Arial";
		ctx.fillText(temp, 100, 30);
	}

	return {
		renderAll: renderAll,
		renderHours: renderHours,
		init: init,
		renderTemp: renderTemp
	};
}();

var futureWeather = function () {
	var elems = {};

	function cacheDom() {
		elems.container = $('.future-days');
		elems.template = $('#template-weather-days');
	}
	function render(data) {
		var template = elems.template.html();
		var out = Mustache.render(template, data);
		elems.container.append(out);
	}
	function init() {
		cacheDom();
	}

	return {
		init: init,
		render: render
	};
}();

$(document).ready(function () {
	menu.init();
	currentWeather.init();
	futureWeather.init();

	metaInfo.getLocation.then(function (lat, long) {
		$.get({
			url: '/w',
			dataType: 'json',
			success: function success(data) {
				console.log(data);
				menu.renderLocation(lat + ',' + long);
				currentWeather.renderHours(data.hourly);
				currentWeather.renderTemp(data.currently.temperature);
				futureWeather.render(data.daily);
			}

		});
	});
	// navigator.geolocation.getCurrentPosition(function(pos) {
});
