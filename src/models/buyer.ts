import mongoose from 'mongoose';

const buyerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default mongoose.models.Buyer || mongoose.model('Buyer', buyerSchema);
