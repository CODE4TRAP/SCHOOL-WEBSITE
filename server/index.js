import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Admission } from './models/Admission.js';
import { Inquiry } from './models/Inquiry.js';
import { Notice } from './models/Notice.js';
import { Admin } from './models/Admin.js';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://CodeX:CodeX@codex-in3.evr1nui.mongodb.net/swami_shiwanand_db?retryWrites=true&w=majority&appName=CodeX-in3';

// Ensure DB connection for each request (vital for serverless environments like Vercel)
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await mongoose.connect(MONGO_URI);
    } catch (err) {
      console.error('MongoDB connection error on request:', err.message);
    }
  }
  next();
});

console.log('Connecting to MongoDB database...');
mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB successfully.');
    await seedInitialData();
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
  });

// Seed Initial Admin and Notices if empty
async function seedInitialData() {
  try {
    // 1. Seed or Upsert Admin
    const targetUser = (process.env.ADMIN_EMAIL || process.env.ADMIN_USERNAME || 'shiva@mail.com').toLowerCase();
    const targetPass = process.env.ADMIN_PASSWORD || 'check123';
    await Admin.findOneAndUpdate(
      { username: targetUser },
      { username: targetUser, password: targetPass, name: 'Principal & Director Office', role: 'superadmin' },
      { upsert: true, new: true }
    );
    console.log(`🌱 Verified admin credentials for: "${targetUser}"`);

    // 2. Seed Initial Notices
    const noticeCount = await Notice.countDocuments();
    if (noticeCount === 0) {
      const defaultNotices = [
        {
          title: 'Admission Notice for Session 2026–27: Playgroup, Nursery, LKG, UKG & Std I–V',
          date: '05-10-2026',
          category: 'Admission',
          desc: 'Admission registration for Academic Session 2026-27 is now officially open for Playgroup, Nursery, LKG, UKG, and Classes I to V. Collect the prospectus along with registration form from the school counter or complete online registration.',
          isNew: true
        },
        {
          title: 'Circular: Parents-Teacher Meeting (PTM) for Pre-Primary & Primary Wings',
          date: '28-09-2026',
          category: 'Academics',
          desc: 'Dear Parents, the first term Parents-Teacher Meeting (PTM) will be held this Saturday between 9:00 AM and 1:00 PM. Kindly attend to discuss your child\'s academic growth and joyful learning activities.',
          isNew: true
        },
        {
          title: 'Staff Recruitment 2026–27: NTT & PRT Teachers, Music & Art Instructors',
          date: '15-09-2026',
          category: 'Recruitment',
          desc: 'Applications are invited from passionate NTT/PRT trained teachers, Activity Incharges, and Sports Coaches. Walk-in interviews scheduled every Saturday.',
          isNew: false
        },
        {
          title: 'Upcoming Event: Kids Sports Meet & Fun Carnival 2026',
          date: '01-09-2026',
          category: 'Events',
          desc: 'Swami Shiwanand Academy & Kid\'s Play School is pleased to announce the upcoming Kids Sports and Fun Carnival. Registration starts next Monday.',
          isNew: false
        }
      ];
      await Notice.insertMany(defaultNotices);
      console.log('🌱 Seeded initial notices to MongoDB.');
    }
  } catch (err) {
    console.error('Error during initial data seed:', err.message);
  }
}

/* ========================================================
   API ROUTES
   ======================================================== */

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date(), database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// --- ADMIN AUTH ---
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both username and password.' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }

    // In a real app we'd sign a JWT; for simplicity and robustness we return auth session object
    const token = Buffer.from(`${admin.username}:${Date.now()}`).toString('base64');
    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- ADMIN STATS ---
app.get('/api/admin/stats', async (req, res) => {
  try {
    const [totalAdmissions, pendingAdmissions, totalInquiries, newInquiries, totalNotices] = await Promise.all([
      Admission.countDocuments(),
      Admission.countDocuments({ status: 'Pending' }),
      Inquiry.countDocuments(),
      Inquiry.countDocuments({ status: 'New' }),
      Notice.countDocuments()
    ]);

    res.json({
      success: true,
      stats: {
        totalAdmissions,
        pendingAdmissions,
        totalInquiries,
        newInquiries,
        totalNotices
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- ADMISSION ROUTES ---
// GET all admissions
app.get('/api/admissions', async (req, res) => {
  try {
    const { status, search, className } = req.query;
    const query = {};
    if (status && status !== 'All') query.status = status;
    if (className && className !== 'All') query.applyingClass = className;
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { appNumber: { $regex: search, $options: 'i' } },
        { fatherName: { $regex: search, $options: 'i' } },
        { mobile: { $regex: search, $options: 'i' } }
      ];
    }

    const admissions = await Admission.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: admissions.length, data: admissions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new admission (Public application submission)
app.post('/api/admissions', async (req, res) => {
  try {
    const count = await Admission.countDocuments();
    const appNumber = `SSKPS-2026-${String(count + 1001).padStart(4, '0')}`;

    const newAdmission = await Admission.create({
      ...req.body,
      appNumber
    });

    res.status(201).json({
      success: true,
      message: 'Admission submitted successfully',
      data: newAdmission
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PATCH update admission status / notes
app.patch('/api/admissions/:id', async (req, res) => {
  try {
    const updated = await Admission.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Admission record not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE admission
app.delete('/api/admissions/:id', async (req, res) => {
  try {
    const deleted = await Admission.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Admission record not found' });
    res.json({ success: true, message: 'Admission deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- INQUIRIES ROUTES ---
// GET all inquiries
app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new inquiry (from contact page)
app.post('/api/inquiries', async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({ success: true, message: 'Inquiry submitted successfully', data: inquiry });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PATCH inquiry status
app.patch('/api/inquiries/:id', async (req, res) => {
  try {
    const updated = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE inquiry
app.delete('/api/inquiries/:id', async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Inquiry removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// --- NOTICES ROUTES ---
// GET all notices
app.get('/api/notices', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json({ success: true, count: notices.length, data: notices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new notice
app.post('/api/notices', async (req, res) => {
  try {
    const notice = await Notice.create(req.body);
    res.status(201).json({ success: true, message: 'Notice published successfully', data: notice });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT update notice
app.put('/api/notices/:id', async (req, res) => {
  try {
    const updated = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE notice
app.delete('/api/notices/:id', async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Notice deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Start Express Server
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Express Backend Server running on http://localhost:${PORT}`);
  });
}

export default app;
