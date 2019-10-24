/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

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

    let address = JSON.parse(body);
    callback(error, address['ip']);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  let address = ip;
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
    let coord = JSON.parse(body);
    let lat = coord.data['latitude'];
    let long = coord.data['longitude'];
    callback(error, lat, long);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };