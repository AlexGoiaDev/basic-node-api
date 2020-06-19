const mongoose = require('mongoose');
// eslint-disable-next-line no-useless-escape

const registerSchema = mongoose.Schema({
  /* Peso */
  weight: {
    type: Number,
  },
  weightUnit: {
    type: String,
  },
  /* Frecuencia */
  repetitions: {
    type: Number,
  },
  /* Segundos */
  duration: {
    type: Number,
  },
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  },
});

module.exports = mongoose.model('Register', registerSchema);
