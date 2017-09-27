const express = require('express');

var app = express();

app.get('/', (req, res) => {
  // res.send('<h1>Hello express</h1>');
  res.send({
    name: 'Michael',
    likes: [
      'Stuff',
      'Things'
    ]
  })
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

// /bad
// Send back JSON with an errorMessage property
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error processing request'
  })
});

app.listen(3000);