const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dqem5cckn', 
    api_key: '815874836858272', 
    api_secret: '5kuEi-3jMRoUgtb0E_D8TtmxM8E',
    secure: true
  });

module.exports = cloudinary