import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema(
  {
    appNumber: { type: String, required: true, unique: true },
    studentName: { type: String, required: true },
    applyingClass: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, default: '' },
    ageDay: { type: String, default: '' },
    ageMonth: { type: String, default: '' },
    ageYear: { type: String, default: '' },
    currentSchool: { type: String, default: '' },
    currentStandard: { type: String, default: '' },
    previousSchool: { type: String, default: '' },
    motherName: { type: String, required: true },
    fatherName: { type: String, required: true },
    caste: { type: String, default: '' },
    category: { type: String, default: '' },
    religion: { type: String, default: '' },
    bloodGroup: { type: String, default: '' },
    bpl: { type: String, default: 'No' },
    permanentAddress: { type: String, default: '' },
    currentAddress: { type: String, default: '' },
    address: { type: String, default: '' },
    motherContact: { type: String, default: '' },
    fatherContact: { type: String, default: '' },
    mobile: { type: String, required: true },
    whatsapp: { type: String, default: '' },
    email: { type: String, default: '' },
    transportNeeded: { type: String, default: 'No' },
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

