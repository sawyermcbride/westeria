// Westeria by Sawyer McBrdie

const express = require('express');

const app = express();

app.use(function(req, res, next) {
	console.log(req.url);
	next();
});

app.get('/w', function (req, res) {
	res.json({
		time: '5PM',
		temperatureMin: 99,
		temperature: 100,
		date: "MARCH !9Th",
		days: [
			{
				day:'tuesday'
			}
		], 
		temperature: "5DEG FFFFF",

	});
});


app.use(express.static('public'));

app.listen(80, '0.0.0.0');