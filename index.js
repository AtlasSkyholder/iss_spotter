// index.js
// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// let id = 'https://ipvigilante.com/66.207.199.230';

// fetchCoordsByIP(id ,(error, lat, long) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   console.log("It worked! Latitude: " + lat + " and Longitude: " + long);
//   let place = {};
//   place['latitude'] = parseFloat(lat);
//   place['longitude'] = parseFloat(long);
//   return place;
// });

// let coords = { latitude: 43.63830, longitude: -79.43010};

// fetchISSFlyOverTimes(coords, (error, arr) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   console.log("It worked!");
//   console.log(arr.response);
// });


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});