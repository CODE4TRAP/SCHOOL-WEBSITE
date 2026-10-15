import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
    name: { type: String, default: 'School Administrator' }
  },
  { timestamps: true }
);

export const Admin = mongoose.model('Admin', adminSchema);
