import mongoose from 'mongoose';

const directivaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  cargo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  versionKey: false,
  timestamps: true,
});

export default mongoose.model('Directiva', directivaSchema);