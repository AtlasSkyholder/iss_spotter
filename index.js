// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

let id = 'https://ipvigilante.com/66.207.199.230';

//let id = 'https://ipvigilante.com/json/invalidiphere';

fetchCoordsByIP(id ,(error, lat, long) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("It worked! Latitude: " + lat + " and Longitude: " + long);
});