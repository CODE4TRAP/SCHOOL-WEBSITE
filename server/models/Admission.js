import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema(
  {
    appNumber: { type: String, required: true, unique: true },
    studentName: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    applyingClass: { type: String, required: true },
    fatherName: { type: String, required: true },
    motherName: { type: String, required: true },
    mobile: { type: String, required: true },
    whatsapp: { type: String },
    address: { type: String, required: true },
    transportNeeded: { type: String, default: 'No' },
    previousSchool: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Contacted', 'Rejected'],
      default: 'Pending'
    },
    notes: { type: String, default: '' }
  },
  { timestamps: true }
);

export const Admission = mongoose.model('Admission', admissionSchema);
