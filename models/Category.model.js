/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');


// eslint-disable-next-line no-useless-escape
const validateSlug = (email) => /^[a-z]+(?:-[a-z]+)*$/.test(email);

const categorySchema = mongoose.Schema({
  slug: {
    type: String,
    required: 'Name of category is required.',
    unique: true,
    minlength: 4,
    maxlength: 200,
    validate: [validateSlug, 'Invalid slug name'],
  },
  translations: [
    {
      lang: {
        type: 'String',
        minlength: 2,
        maxlength: 2,
        enum: ['es', 'en'],
        default: 'es',
      },
      translation: {
        type: String,
        minlength: 3,
        maxlength: 80,
        required: 'Translation is required',
      },
    },
  ],
  phrases: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Phrase',
    },
  ],
});

module.exports = mongoose.model('Category', categorySchema);
