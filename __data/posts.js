// _data/posts.js
const fetch = require('node-fetch');

module.exports = async function() {
  const response = await fetch('http://127.0.0.1:1337/api/posts');
  const data = await response.json();
  return data.data; // Returns the array of posts
};
