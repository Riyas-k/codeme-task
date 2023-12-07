import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
});

const User = mongoose.model('User', userSchema);

export default User;
