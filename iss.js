const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  let address = 'https://api.ipify.org?format=json';
  request(address, (error, response, body) => {

    // inside the request callback ...
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // if we get here, all's well and we got the data

    let ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  let address = 'https://ipvigilante.com/json/' + ip;
  request(address, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `It didn't work! Error: Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let coord = JSON.parse(body).data;
    let place = {};
    place['latitude'] = coord['latitude'];
    place['longitude'] = coord['longitude'];
    callback(null, place);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {

  let lat = coords['latitude'];
  let long = coords['longitude'];
  let address = 'http://api.open-notify.org/iss-pass.json?lat=' + lat + '&lon=' + long;
  request(address, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `It didn't work! Error: Status Code ${response.statusCode}!! The latitude ${lat} and longitude ${long} haven't been obtained`;
      callback(Error(msg), null);
      return;
    }
    // ...
    let arr = JSON.parse(body).response;
    callback(null , arr);
  });
};

// iss.js 

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

// Only export nextISSTimesForMyLocation and not the other three (API request) functions.
// This is because they are not needed by external modules.

module.exports = { nextISSTimesForMyLocation };