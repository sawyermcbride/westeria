# Westeria
## By Sawyer McBride
API documentation listed below. Written in React/es6. The backend api is written by me in Node and with expressjs. Worked on mostly during fall of 2017. 

### api docs
##### Method in **BOLD**
##### _All responses are in json_


**GET** ```/l?long=LONGITUDE&lat=LATITUDE```:
```javascript
{
    addr: "San Jose, CA, USA"
}
```

**GET** ```/w?long=LONGITUDE&lat=LATITUDE```
```javascript
{
  "hours": [
    {
      "icon": "clear-night",
      "hour": 23,
      "temp": 54,
      "rain": 0,
      "wind": 1.93,
      "cloudCover": 0.19
    },
    {
      "icon": "clear-night",
      "hour": 0,
      "temp": 52,
      "rain": 0,
      "wind": 2.21,
      "cloudCover": 0.17
    },
    {
      "icon": "clear-night",
      "hour": 1,
      "temp": 51,
      "rain": 0,
      "wind": 1.96,
      "cloudCover": 0.15
    },
    {
      "icon": "clear-night",
      "hour": 2,
      "temp": 51,
      "rain": 0,
      "wind": 2.32,
      "cloudCover": 0.15
    },
    {
      "icon": "clear-night",
      "hour": 3,
      "temp": 50,
      "rain": 0,
      "wind": 2.25,
      "cloudCover": 0.17
    },
    {
      "icon": "clear-night",
      "hour": 4,
      "temp": 50,
      "rain": 0,
      "wind": 2.69,
      "cloudCover": 0.17
    },
    {
      "icon": "clear-night",
      "hour": 5,
      "temp": 49,
      "rain": 0,
      "wind": 2.91,
      "cloudCover": 0.17
    },
    {
      "icon": "clear-night",
      "hour": 6,
      "temp": 49,
      "rain": 0,
      "wind": 2.56,
      "cloudCover": 0.22
    },
    {
      "icon": "clear-night",
      "hour": 7,
      "temp": 50,
      "rain": 0,
      "wind": 2.47,
      "cloudCover": 0.2
    },
    {
      "icon": "clear-day",
      "hour": 8,
      "temp": 52,
      "rain": 0,
      "wind": 3.1,
      "cloudCover": 0.18
    },
    {
      "icon": "clear-day",
      "hour": 9,
      "temp": 56,
      "rain": 0,
      "wind": 4.08,
      "cloudCover": 0.17
    },
    {
      "icon": "clear-day",
      "hour": 10,
      "temp": 58,
      "rain": 0,
      "wind": 5.61,
      "cloudCover": 0.09
    }
  ],
  "days": [
    {
      "icon": "partly-cloudy-day",
      "day": "Saturday",
      "rain": 0,
      "tempMax": 61,
      "tempMin": 49,
      "wind": 3.13,
      "cloudCover": 0.27
    },
    {
      "icon": "clear-day",
      "day": "Sunday",
      "rain": 0,
      "tempMax": 72,
      "tempMin": 49,
      "wind": 4.53,
      "cloudCover": 0.12
    },
    {
      "icon": "clear-day",
      "day": "Monday",
      "rain": 0,
      "tempMax": 72,
      "tempMin": 51,
      "wind": 7.54,
      "cloudCover": 0
    },
    {
      "icon": "partly-cloudy-night",
      "day": "Tuesday",
      "rain": 0,
      "tempMax": 71,
      "tempMin": 52,
      "wind": 5.32,
      "cloudCover": 0.22
    },
    {
      "icon": "partly-cloudy-day",
      "day": "Wednesday",
      "rain": 0,
      "tempMax": 69,
      "tempMin": 54,
      "wind": 1.45,
      "cloudCover": 0.47
    },
    {
      "icon": "partly-cloudy-night",
      "day": "Thursday",
      "rain": 0,
      "tempMax": 70,
      "tempMin": 54,
      "wind": 0.24,
      "cloudCover": 0.05
    },
    {
      "icon": "partly-cloudy-day",
      "day": "Friday",
      "rain": 0,
      "tempMax": 69,
      "tempMin": 54,
      "wind": 2.97,
      "cloudCover": 0.9
    },
    {
      "icon": "partly-cloudy-night",
      "day": "Saturday",
      "rain": 0,
      "tempMax": 66,
      "tempMin": 52,
      "wind": 6.51,
      "cloudCover": 0.4
    }
  ],
  "current": {
    "icon": "clear-night",
    "temp": 54,
    "rain": 0,
    "cloudCover": 0.19,
    "wind": 0.19
  }
}
````
