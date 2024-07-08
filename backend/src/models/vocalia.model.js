import mongoose from 'mongoose';

const vocaliaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  participantes: [{
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    }
  }],
}, {
  versionKey: false,
  timestamps: true,
});

export default mongoose.model('Vocalia', vocaliaSchema);