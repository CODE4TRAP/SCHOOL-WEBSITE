import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Admission } from './models/Admission.js';
import { Inquiry } from './models/Inquiry.js';
import { Notice } from './models/Notice.js';
import { Admin } from './models/Admin.js';

dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'sskps_jwt_super_secure_school_secret_key_2026';

if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  console.warn('⚠️ WARNING: JWT_SECRET is not configured in production environment variables!');
}

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('❌ CRITICAL ERROR: MONGO_URI is missing from environment configuration.');
}

/* ========================================================
   SECURITY HEADERS & MIDDLEWARE
   ======================================================== */

// Helmet Security Headers (HSTS, X-Frame-Options, X-Content-Type-Options: nosniff, etc.)
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  })
);

// Restrictive CORS Policy
const allowedOrigins = [
  'https://sskps.vercel.app',
  'http://localhost:5173',
  'http://localhost:5000',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5000'
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, server-to-server or same-origin)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error('CORS policy violation: Access denied from this origin.'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Strict Request Payload Limit (Defend against payload DOS)
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// NoSQL Injection & Operator Sanitizer Middleware
const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  for (const key of Object.keys(obj)) {
    if (key.startsWith('$') || key.includes('.')) {
      delete obj[key];
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      sanitizeObject(obj[key]);
    }
  }
  return obj;
};

app.use((req, res, next) => {
  if (req.body) sanitizeObject(req.body);
  if (req.params) sanitizeObject(req.params);
  if (req.query && typeof req.query === 'object') {
    for (const key of Object.keys(req.query)) {
      if (key.startsWith('$') || key.includes('.')) {
        delete req.query[key];
      }
    }
  }
  next();
});

/* ========================================================
   RATE LIMITING
   ======================================================== */

// General API Rate Limiter
const generalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 400,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Please slow down.' }
});
app.use('/api/', generalLimiter);

// Strict Rate Limiter for Admin Authentication (Brute-force protection)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts from this address. Please wait 15 minutes before trying again.'
  }
});

// Rate Limiter for Public Contact Inquiries
const inquiryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Enquiry submission limit reached. Please wait a few minutes before submitting another message.'
  }
});

// Rate Limiter for Public Admission Registrations
const admissionLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Admission submission limit reached. Please wait a few minutes before submitting again.'
  }
});

/* ========================================================
   DATABASE CONNECTION & DATA SEEDING
   ======================================================== */

let isConnected = false;
async function connectDB() {
  if (isConnected || mongoose.connection.readyState === 1) return;
  if (!MONGO_URI) {
    console.error('❌ Cannot connect to database: MONGO_URI is missing.');
    return;
  }
  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log('✅ Connected to MongoDB successfully.');
    await seedInitialData();
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
  }
}

// Ensure DB connection for serverless environments (Vercel)
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState !== 1 && MONGO_URI) {
    await connectDB();
  }
  next();
});

if (MONGO_URI) {
  connectDB();
}

async function seedInitialData() {
  try {
    // 1. Seed or Upgrade Admin
    const targetUser = (process.env.ADMIN_EMAIL || process.env.ADMIN_USERNAME || 'shiva@mail.com').toLowerCase().trim();
    const targetPass = process.env.ADMIN_PASSWORD || 'check123';

    let admin = await Admin.findOne({ username: targetUser });
    if (!admin) {
      try {
        admin = new Admin({
          username: targetUser,
          password: targetPass,
          name: 'Principal & Director Office',
          role: 'superadmin'
        });
        await admin.save();
        console.log(`🌱 Created secure administrator account: "${targetUser}"`);
      } catch (err) {
        if (err.code === 11000) {
          admin = await Admin.findOne({ username: targetUser });
        } else {
          throw err;
        }
      }
    }
    
    if (admin && !admin.password.startsWith('$2a$') && !admin.password.startsWith('$2b$')) {
      admin.password = targetPass;
      await admin.save();
      console.log(`🔒 Upgraded admin credentials to bcrypt hash for: "${targetUser}"`);
    }

    // 2. Seed Initial Notices if empty
    const noticeCount = await Notice.countDocuments();
    if (noticeCount === 0) {
      const defaultNotices = [
        {
          title: 'Admission Notice for Session 2026–27: Playgroup, Nursery, LKG, UKG & Std I–VI',
          date: '05-10-2026',
          category: 'Admission',
          desc: 'Admission registration for Academic Session 2026-27 is now officially open for Playgroup, Nursery, LKG, UKG, and Classes I to VI. Collect the prospectus along with registration form from the school counter or complete online registration.',
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
    } else {
      await Notice.updateMany(
        { title: /Std I[–-]V/i },
        {
          $set: {
            title: 'Admission Notice for Session 2026–27: Playgroup, Nursery, LKG, UKG & Std I–VI',
            desc: 'Admission registration for Academic Session 2026-27 is now officially open for Playgroup, Nursery, LKG, UKG, and Classes I to VI. Collect the prospectus along with registration form from the school counter or complete online registration.'
          }
        }
      );
    }
  } catch (err) {
    console.error('Error during initial data seed:', err.message);
  }
}

/* ========================================================
   SECURITY AUTHORIZATION & VALIDATION MIDDLEWARES
   ======================================================== */

// Authenticate Admin JWT Token
const requireAdminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied: Institutional administrative authorization required.'
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied: Token missing.'
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Administrative session has expired or is invalid. Please sign in again.'
      });
    }

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrative token payload.'
      });
    }

    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Administrator account no longer active.'
      });
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: 'Authentication processing failed.'
    });
  }
};

// Validate MongoDB ObjectId Parameter
const validateObjectId = (req, res, next) => {
  const id = req.params.id;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid record identifier format.'
    });
  }
  next();
};

/* ========================================================
   API ROUTES
   ======================================================== */

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// --- ADMIN AUTH ---
app.post('/api/admin/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'Please provide both username and password.' });
    }

    const cleanUser = username.trim().toLowerCase();
    const admin = await Admin.findOne({ username: cleanUser });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid institutional credentials.' });
    }

    const isMatch = await admin.comparePassword(password.trim());
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid institutional credentials.' });
    }

    // Sign secure JWT token with 8 hours lifespan
    const token = jwt.sign(
      {
        id: admin._id,
        username: admin.username,
        role: admin.role
      },
      JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({
      success: true,
      message: 'Authentication successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'An internal error occurred during authentication.' });
  }
});

// --- ADMIN STATS (Protected) ---
app.get('/api/admin/stats', requireAdminAuth, async (req, res) => {
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
    console.error('Stats error:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve administrative statistics.' });
  }
});

// --- ADMISSION ROUTES ---
// GET all admissions (Protected)
app.get('/api/admissions', requireAdminAuth, async (req, res) => {
  try {
    const { status, search, className } = req.query;
    const query = {};
    if (status && status !== 'All' && typeof status === 'string') {
      query.status = status.trim();
    }
    if (className && className !== 'All' && typeof className === 'string') {
      query.applyingClass = className.trim();
    }
    if (search && typeof search === 'string') {
      const safeSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (safeSearch.length > 0) {
        query.$or = [
          { studentName: { $regex: safeSearch, $options: 'i' } },
          { appNumber: { $regex: safeSearch, $options: 'i' } },
          { fatherName: { $regex: safeSearch, $options: 'i' } },
          { motherName: { $regex: safeSearch, $options: 'i' } },
          { mobile: { $regex: safeSearch, $options: 'i' } },
          { fatherContact: { $regex: safeSearch, $options: 'i' } },
          { motherContact: { $regex: safeSearch, $options: 'i' } },
          { category: { $regex: safeSearch, $options: 'i' } }
        ];
      }
    }

    const admissions = await Admission.find(query).sort({ createdAt: -1 }).lean();
    res.json({ success: true, count: admissions.length, data: admissions });
  } catch (err) {
    console.error('Admissions fetch error:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve admission records.' });
  }
});

// POST new admission (Public registration form with rate limiter & whitelisting)
app.post('/api/admissions', admissionLimiter, async (req, res) => {
  try {
    const body = req.body || {};

    const studentName = String(body.studentName || '').trim();
    const applyingClass = String(body.applyingClass || '').trim();
    const dob = String(body.dob || '').trim();
    const motherName = String(body.motherName || '').trim();
    const fatherName = String(body.fatherName || '').trim();
    const mobile = String(body.mobile || body.fatherContact || body.motherContact || '').trim();

    if (!studentName || !applyingClass || !dob || !motherName || !fatherName || !mobile) {
      return res.status(400).json({
        success: false,
        message: 'Mandatory fields missing: Student Name, Class, DOB, Mother Name, Father Name, and Mobile Number are required.'
      });
    }

    const count = await Admission.countDocuments();
    const appNumber = `SSKPS-2026-${String(count + 1001).padStart(4, '0')}`;

    // Whitelist only legitimate input fields (prevents mass-assignment)
    const sanitizedData = {
      appNumber,
      studentName,
      applyingClass,
      dob,
      gender: String(body.gender || '').trim(),
      ageDay: String(body.ageDay || '').trim(),
      ageMonth: String(body.ageMonth || '').trim(),
      ageYear: String(body.ageYear || '').trim(),
      currentSchool: String(body.currentSchool || '').trim(),
      currentStandard: String(body.currentStandard || '').trim(),
      previousSchool: String(body.previousSchool || '').trim(),
      motherName,
      fatherName,
      caste: String(body.caste || '').trim(),
      category: String(body.category || '').trim(),
      religion: String(body.religion || '').trim(),
      bloodGroup: String(body.bloodGroup || '').trim(),
      bpl: body.bpl === 'Yes' ? 'Yes' : 'No',
      permanentAddress: String(body.permanentAddress || '').trim(),
      currentAddress: String(body.currentAddress || '').trim(),
      address: String(body.address || body.permanentAddress || body.currentAddress || '').trim(),
      motherContact: String(body.motherContact || '').trim(),
      fatherContact: String(body.fatherContact || '').trim(),
      mobile,
      whatsapp: String(body.whatsapp || '').trim(),
      email: String(body.email || '').trim(),
      transportNeeded: body.transportNeeded === 'Yes' ? 'Yes' : 'No',
      status: 'Pending',
      notes: ''
    };

    const newAdmission = await Admission.create(sanitizedData);

    res.status(201).json({
      success: true,
      message: 'Admission submitted successfully',
      data: newAdmission
    });
  } catch (err) {
    console.error('Admission submit error:', err);
    res.status(400).json({ success: false, message: 'Invalid registration submission. Please verify your details.' });
  }
});

// PATCH update admission status / notes (Protected)
app.patch('/api/admissions/:id', requireAdminAuth, validateObjectId, async (req, res) => {
  try {
    const allowedStatuses = ['Pending', 'Approved', 'Contacted', 'Rejected'];
    const updateFields = {};

    if (req.body.status !== undefined) {
      if (!allowedStatuses.includes(req.body.status)) {
        return res.status(400).json({ success: false, message: 'Invalid admission status.' });
      }
      updateFields.status = req.body.status;
    }
    if (typeof req.body.notes === 'string') {
      updateFields.notes = req.body.notes.trim();
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ success: false, message: 'No valid fields provided for update.' });
    }

    const updated = await Admission.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Admission record not found.' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error('Admission update error:', err);
    res.status(500).json({ success: false, message: 'Failed to update admission record.' });
  }
});

// DELETE admission (Protected)
app.delete('/api/admissions/:id', requireAdminAuth, validateObjectId, async (req, res) => {
  try {
    const deleted = await Admission.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Admission record not found.' });
    }
    res.json({ success: true, message: 'Admission record deleted successfully.' });
  } catch (err) {
    console.error('Admission delete error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete admission record.' });
  }
});

// --- INQUIRIES ROUTES ---
// GET all inquiries (Protected)
app.get('/api/inquiries', requireAdminAuth, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, count: inquiries.length, data: inquiries });
  } catch (err) {
    console.error('Inquiries fetch error:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve inquiry records.' });
  }
});

// POST new inquiry (Public contact form with rate limiter & whitelisting)
app.post('/api/inquiries', inquiryLimiter, async (req, res) => {
  try {
    const { name, phone, email, childAge, message } = req.body || {};
    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone number, and message are required.'
      });
    }

    const inquiryData = {
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : '',
      childAge: childAge ? String(childAge).trim() : '',
      message: String(message).trim(),
      status: 'New'
    };

    const inquiry = await Inquiry.create(inquiryData);
    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully',
      data: {
        id: inquiry._id,
        name: inquiry.name,
        createdAt: inquiry.createdAt
      }
    });
  } catch (err) {
    console.error('Inquiry create error:', err);
    res.status(400).json({ success: false, message: 'Invalid inquiry submission.' });
  }
});

// PATCH inquiry status (Protected)
app.patch('/api/inquiries/:id', requireAdminAuth, validateObjectId, async (req, res) => {
  try {
    const allowedStatuses = ['New', 'Responded', 'Archived'];
    const { status } = req.body || {};

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid inquiry status.' });
    }

    const updated = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Inquiry record not found.' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error('Inquiry update error:', err);
    res.status(500).json({ success: false, message: 'Failed to update inquiry.' });
  }
});

// DELETE inquiry (Protected)
app.delete('/api/inquiries/:id', requireAdminAuth, validateObjectId, async (req, res) => {
  try {
    const deleted = await Inquiry.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Inquiry record not found.' });
    }
    res.json({ success: true, message: 'Inquiry removed successfully.' });
  } catch (err) {
    console.error('Inquiry delete error:', err);
    res.status(500).json({ success: false, message: 'Failed to remove inquiry.' });
  }
});

// --- NOTICES ROUTES ---
// GET all notices (Public)
app.get('/api/notices', async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, count: notices.length, data: notices });
  } catch (err) {
    console.error('Notices fetch error:', err);
    res.status(500).json({ success: false, message: 'Failed to load notices.' });
  }
});

// POST new notice (Protected)
app.post('/api/notices', requireAdminAuth, async (req, res) => {
  try {
    const { title, date, category, desc, isNew } = req.body || {};
    if (!title || !date || !desc) {
      return res.status(400).json({ success: false, message: 'Title, date, and description are required.' });
    }

    const noticeData = {
      title: String(title).trim(),
      date: String(date).trim(),
      category: String(category || 'General').trim(),
      desc: String(desc).trim(),
      isNew: Boolean(isNew)
    };

    const notice = await Notice.create(noticeData);
    res.status(201).json({ success: true, message: 'Notice published successfully', data: notice });
  } catch (err) {
    console.error('Notice create error:', err);
    res.status(400).json({ success: false, message: 'Failed to publish notice.' });
  }
});

// PUT update notice (Protected)
app.put('/api/notices/:id', requireAdminAuth, validateObjectId, async (req, res) => {
  try {
    const { title, date, category, desc, isNew } = req.body || {};
    const updateData = {};
    if (title) updateData.title = String(title).trim();
    if (date) updateData.date = String(date).trim();
    if (category) updateData.category = String(category).trim();
    if (desc) updateData.desc = String(desc).trim();
    if (isNew !== undefined) updateData.isNew = Boolean(isNew);

    const updated = await Notice.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Notice not found.' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error('Notice update error:', err);
    res.status(400).json({ success: false, message: 'Failed to update notice.' });
  }
});

// DELETE notice (Protected)
app.delete('/api/notices/:id', requireAdminAuth, validateObjectId, async (req, res) => {
  try {
    const deleted = await Notice.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Notice not found.' });
    }
    res.json({ success: true, message: 'Notice deleted successfully.' });
  } catch (err) {
    console.error('Notice delete error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete notice.' });
  }
});

/* ========================================================
   CENTRAL ERROR HANDLER
   ======================================================== */
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Unhandled error:`, err.message);
  if (err.message && err.message.includes('CORS policy violation')) {
    return res.status(403).json({ success: false, message: 'Access forbidden: CORS origin not allowed.' });
  }
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred. Please try again later.'
  });
});

// Start Express Server for Local Development
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Express Backend Server running on http://localhost:${PORT}`);
  });
}

export default app;
