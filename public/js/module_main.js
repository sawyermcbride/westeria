'use strict';

const utils = {

}
const menu = (function() {
	let elems = {};
	function _cacheDom() {
		elems.nav = $('nav');
		elems.location = elems.nav.find('#location-title');
		elems.signIn = elems.nav.find('#btn-signin');
		elems.signUp = elems.nav.find('#btn-join');
	}

	function _bindEvents () {

	}
	function init () {
		_cacheDom();
		_bindEvents();
	}

	function _renderLocation ( location ) {
		elems.location.html(location);
	}

	return {
		renderLocation: _renderLocation,
		init: init
	}

})();

const currentWeather = (function () {
	let elems = {};

	function _cacheDom () {
		elems.container = $('section.current');
		elems.currentContainer = elems.container.find('current-now');
		elems.canvas = elems.currentContainer.find('canvas#current-temp');
		elems.hourlyContainer = elems.container.find('.current-hourly');
		elems.template = $('#template-weather-hourly');
	}
	function _bindEvents () {

	}
	function init () {
		_cacheDom();
		_bindEvents();
	}
	function renderAll (data) {
		renderHours(data);

	}

	function renderHours (data) {
		data.data = data.data.slice(0,4);

		let template = elems.template.html();
		console.log(template)
		let out = Mustache.render(template, data);
		//append the rendered html from mustache
		elems.hourlyContainer.append(out);

	}

	function drawCanvas (temp) {
		if(typeof temp === 'object') {
			console.error('Canvas temp must be a integer');
			return false;
		}

		let ctx = elems.canvas.getContext('2d');
		//draw
	}

	return {
		renderAll: renderAll,
		renderHours: renderHours,
		init: init
	}

})();

const futureWeather = (function () {
	function renderDays (data) {
				
	}

	return {
		render: renderDays
	}
})();


$(document).ready(function() {
	menu.init();
	currentWeather.init();

	// navigator.geolocation.getCurrentPosition(function(pos) {
		$.ajax({
			url: 'https://api.forecast.io/forecast/311b8f1ba7fb57a38aaf771086360d88/37.8267,-122.423',
			jsonp: 'callback',
			dataType: 'jsonp',
			success: function(data) {
				console.log(data);
				menu.renderLocation(data.longitude +','+ data.latitude);
				currentWeather.renderHours(data.hourly);
			}

		});
	// });
});