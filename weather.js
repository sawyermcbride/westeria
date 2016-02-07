'use strict';

const express = require('express');

const weather = express.Router();

const http = require('http');
const request = require('./request');

let obj = {};

let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


const toHours = function (t) {
  return  new Date(t*1000).getHours();
}

weather.get('/', (req, res) => {
    request.get('https://api.forecast.io/forecast/4f0d96d34194def53f1c30a785b314fd/37.8267,-122.423').then( (data) => {
      
    let out = JSON.parse(data);
      
      
    obj.hours = [];
    obj.days = [];
    
    console.log(out.currently)
      
    obj.current = {
      icon: out.currently.icon,
      temp: Math.round(out.currently.temperature),
      rain: out.currently.precipProbability,
      cloudCover: out.currently.cloudCover,
      wind: out.currently.cloudCover
    }
    
    //build
    
    for (let i = 0, arr = out.hourly.data; i < 12 ; i++) {
      obj.hours.push({
        icon: arr[i].icon,
        hour: toHours(arr[i].time),
        temp: Math.round(arr[i].temperature),
        rain: Math.round(arr[i].precipProbability),
        wind: arr[i].windSpeed,
        cloudCover: arr[i].cloudCover
      })
    }
    
      
      
      
    for (let i = 0, arr = out.daily.data, len = arr.length; i < len ; i++) {
      obj.days.push({
        icon: arr[i].icon,
        day: week[new Date(arr[i].time*1000).getDay()],
        rain: Math.round(arr[i].precipProbability),
        tempMax: Math.round(arr[i].temperatureMax),
        tempMin: Math.round(arr[i].temperatureMin),
        wind: arr[i].windSpeed,
        cloudCover: arr[i].cloudCover
      })
    }
           
    res.json(obj);
    
    
  });
});


module.exports = weather;