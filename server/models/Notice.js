import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, default: 'General' },
    desc: { type: String, required: true },
    isNew: { type: Boolean, default: true }
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

export const Notice = mongoose.model('Notice', noticeSchema);
