const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Logger that logs requests
app.use((req, resp, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server log');
    }
  });
  next();
});

// Call response.render in middleware, but don't call next
// app.use((req, resp, next) => {
//   resp.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page',
//     welcomeMessage: "We'll be right back!"
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (textToScream) => {
  return textToScream.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to Express'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad
// Send back JSON with an errorMessage property
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error processing request'
  })
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
