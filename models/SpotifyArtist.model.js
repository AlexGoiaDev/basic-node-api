/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

// eslint-disable-next-line no-useless-escape

const artistSchema = mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 200,
  },
  genres: [
    {
      type: String,
      minlength: 1,
      maxlength: 100,
    },
  ],
  images: [
    {
      type: Object,
    },
  ],
  uri: {
    type: String,
    minlength: 1,
    maxlength: 1000,
  },
  creationDate: {
    type: Date,
    default: new Date(),
    immutable: true,
  },
  lastUpdate: {
    type: Date,
    default: new Date(),
  },
});


module.exports = mongoose.model('SpotifyArtist', artistSchema);
