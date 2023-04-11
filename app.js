const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.get('/beers', async (req, res) => {
  try {
    const beers = await punkAPI.getBeers();
    res.render('beers', { beers });
  } catch (error) {
    console.log(error);
  }
});
// app.get('/beers', (req, res) => {
//   punkAPI
//     .getBeers()
//     .then(beersFromApi => {
//       res.render('beers', { beers: beersFromApi });
//     })
//     .catch(error => {
//       console.log(error);
//       res.send('An error has just occured while retrieving the beers.');
//     });
// });

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/random-beer', async (req, res) => {
  try {
    const beerFromApi = await punkAPI.getRandom();
    res.render('random-beer', { beer: beerFromApi[0] });
  } catch (error) {
    console.log(error);
  }
});

// app.get('/random-beer', (req, res) => {
//   punkAPI
//     .getRandom()
//     .then(beerFromApi => {
//       res.render('random-beer', { beer: beerFromApi[0] });
//     })
//     .catch(error => {
//       console.log(error);
//       res.send('An error has just occured while retrieving the random beer.');
//     });
// });

app.listen(3000, () => console.log('🏃‍ on port 3000'));
