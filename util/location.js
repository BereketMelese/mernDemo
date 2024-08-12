const { default: axios } = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = process.env.OPENCAGE_API_KEY;

async function getCoordsForAddress(address) {
  // return { lat: 40.7484474, lng: -73.9871516 };

  const response = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );
  const data = response.data;
  if (!data || data.status.code !== 200) {
    const error = new HttpError(`${data.status.message}`, 422);
    throw error;
  }
  const coordinates = data.results[0].geometry;
  return coordinates;
}

module.exports = getCoordsForAddress;
