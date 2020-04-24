/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const Category = require('./Category.model');


const phraseSchema = mongoose.Schema({
  phrase: {
    type: String,
    required: 'Phrase is required.',
    minlength: 4,
    maxlength: 300,
    unique: true,
  },
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
    },
  ],
});


phraseSchema.pre('save', (next) => {
  next();
});

phraseSchema.post('save', (doc, next) => {
  if (doc && doc.categories && doc.categories.length > 0) {
    doc.categories.forEach(async (id) => {
      const updated = await Category.findByIdAndUpdate(
        { _id: id },
        { $push: { phrases: doc._id } },
        { new: true }, // Returns the updated document
      );
      if (!updated) {
        next(new Error('Error'));
      }
    });
  }
  next();
});

// Esta función se ejecutará en un try and catch

module.exports = mongoose.model('Phrase', phraseSchema);
