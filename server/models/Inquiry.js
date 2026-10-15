import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    childAge: { type: String },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['New', 'Responded', 'Archived'],
      default: 'New'
    }
  },
  { timestamps: true }
);

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
