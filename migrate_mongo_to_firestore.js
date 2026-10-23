import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import mongoose from 'mongoose';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getCountFromServer,
  Timestamp
} from 'firebase/firestore';

import { Inquiry } from './server/models/Inquiry.js';
import { Admission } from './server/models/Admission.js';
import { Notice } from './server/models/Notice.js';
import { Admin } from './server/models/Admin.js';

// Firebase Config for "sskps-school-website"
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || 'AIzaSyAswxVlqDxyxESE7UFquH-BeTxlBQd1SE8',
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || 'sskps-school-website.firebaseapp.com',
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || 'sskps-school-website',
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || 'sskps-school-website.firebasestorage.app',
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '24915743784',
  appId: process.env.VITE_FIREBASE_APP_ID || '1:24915743784:web:d7d45d53c22d327bb3911d'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const toFirestoreTimestamp = (val) => {
  if (!val) return Timestamp.now();
  const d = new Date(val);
  return isNaN(d.getTime()) ? Timestamp.now() : Timestamp.fromDate(d);
};

async function runMigration() {
  console.log('========================================================');
  console.log('🚀 INITIATING MONGODB TO CLOUD FIRESTORE DATA MIGRATION');
  console.log('Project: sskps-school-website');
  console.log('========================================================\n');

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is missing from environment.');
  }

  // Authenticate with Firebase if admin credentials provided
  const adminEmail = (process.env.ADMIN_EMAIL || 'shiva@mail.com').toLowerCase();
  const adminPass = process.env.ADMIN_PASSWORD || 'check123';

  try {
    const cred = await signInWithEmailAndPassword(auth, adminEmail, adminPass);
    console.log(`🔐 Authenticated with Firebase Auth as: ${cred.user.email}`);
  } catch (authErr) {
    console.log(`ℹ️ Admin email sign-in notice (${authErr.code}), attempting Anonymous Auth...`);
    try {
      const anon = await signInAnonymously(auth);
      console.log(`🔐 Connected anonymously with UID: ${anon.user.uid}`);
    } catch (anonErr) {
      console.warn('⚠️ Anonymous Auth failed:', anonErr.message);
    }
  }

  console.log('\n1. Connecting to source MongoDB Atlas...');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB successfully.\n');

  // --- MIGRATE INQUIRIES ---
  console.log('2. Migrating Inquiries...');
  const inquiries = await Inquiry.find().lean();
  console.log(`Found ${inquiries.length} inquiry records in MongoDB.`);

  for (const inq of inquiries) {
    const docId = inq._id.toString();
    const data = {
      name: inq.name || '',
      phone: inq.phone || '',
      email: inq.email || '',
      childAge: inq.childAge || '',
      message: inq.message || '',
      status: inq.status || 'New',
      createdAt: toFirestoreTimestamp(inq.createdAt),
      updatedAt: toFirestoreTimestamp(inq.updatedAt)
    };
    await setDoc(doc(db, 'inquiries', docId), data, { merge: true });
    console.log(`  -> Migrated Inquiry ID: ${docId} (${inq.name})`);
  }
  console.log('✅ Inquiries migration completed.\n');

  // --- MIGRATE ADMISSIONS ---
  console.log('3. Migrating Admissions...');
  const admissions = await Admission.find().lean();
  console.log(`Found ${admissions.length} admission records in MongoDB.`);

  for (const adm of admissions) {
    const docId = adm._id.toString();
    const cleanAdm = { ...adm };
    delete cleanAdm._id;
    delete cleanAdm.__v;

    const data = {
      ...cleanAdm,
      createdAt: toFirestoreTimestamp(adm.createdAt),
      updatedAt: toFirestoreTimestamp(adm.updatedAt)
    };
    await setDoc(doc(db, 'admissions', docId), data, { merge: true });
    console.log(`  -> Migrated Admission ID: ${docId} (App: ${adm.appNumber}, Student: ${adm.studentName})`);
  }
  console.log('✅ Admissions migration completed.\n');

  // --- MIGRATE NOTICES ---
  console.log('4. Migrating Notices...');
  const notices = await Notice.find().lean();
  console.log(`Found ${notices.length} notices in MongoDB.`);

  for (const not of notices) {
    const docId = not._id.toString();
    const data = {
      title: not.title,
      date: not.date,
      category: not.category || 'General',
      desc: not.desc,
      isNew: Boolean(not.isNew),
      createdAt: toFirestoreTimestamp(not.createdAt),
      updatedAt: toFirestoreTimestamp(not.updatedAt)
    };
    await setDoc(doc(db, 'notices', docId), data, { merge: true });
    console.log(`  -> Migrated Notice ID: ${docId} ("${not.title.substring(0, 40)}...")`);
  }
  console.log('✅ Notices migration completed.\n');

  // --- MIGRATE ADMIN USERS (Metadata & Allowlist) ---
  console.log('5. Registering Authorized Admin Documents in Firestore...');
  const admins = await Admin.find().select('username role name').lean();
  for (const adm of admins) {
    const emailKey = adm.username.toLowerCase();
    const data = {
      username: adm.username,
      email: adm.username.includes('@') ? adm.username.toLowerCase() : `${adm.username.toLowerCase()}@sskps.edu.in`,
      role: adm.role || 'superadmin',
      name: adm.name || 'School Administrator',
      updatedAt: Timestamp.now()
    };
    await setDoc(doc(db, 'admins', emailKey), data, { merge: true });
    console.log(`  -> Configured Authorized Admin: "${data.email}" (Role: ${data.role})`);
  }
  console.log('✅ Admin authorization records created in Firestore.\n');

  // --- RECORD COUNT VERIFICATION ---
  console.log('6. Verifying Document Counts in Cloud Firestore...');
  const [inqCountSnap, admCountSnap, notCountSnap] = await Promise.all([
    getCountFromServer(collection(db, 'inquiries')),
    getCountFromServer(collection(db, 'admissions')),
    getCountFromServer(collection(db, 'notices'))
  ]);

  console.log('\n========================================================');
  console.log('📊 MIGRATION VERIFICATION AUDIT');
  console.log('========================================================');
  console.log(`Inquiries  | MongoDB: ${inquiries.length}  -->  Firestore: ${inqCountSnap.data().count}`);
  console.log(`Admissions | MongoDB: ${admissions.length}  -->  Firestore: ${admCountSnap.data().count}`);
  console.log(`Notices    | MongoDB: ${notices.length}  -->  Firestore: ${notCountSnap.data().count}`);
  console.log('========================================================');

  const matches =
    inquiries.length === inqCountSnap.data().count &&
    admissions.length === admCountSnap.data().count &&
    notices.length === notCountSnap.data().count;

  if (matches) {
    console.log('🎉 VERIFICATION SUCCESS: All records accurately mirrored to Cloud Firestore!');
  } else {
    console.warn('⚠️ Notice: Document counts differ (may be due to preexisting or merged records).');
  }

  await mongoose.disconnect();
  console.log('\nDisconnected from MongoDB. Migration execution complete.');
  process.exit(0);
}

runMigration().catch((err) => {
  console.error('\n❌ Migration Error:', err.message || err);
  if (err.code === 'permission-denied') {
    console.error('\n👉 REASON: Cloud Firestore has security rules blocking write access.');
    console.error('👉 ACTION NEEDED:');
    console.error('   1. In Firebase Console (https://console.firebase.google.com/project/sskps-school-website/firestore/rules),');
    console.error('      update rules to the contents of "firestore.rules" or temporarily allow write.');
    console.error('   2. Alternatively, create an admin user (e.g. shiva@mail.com) under Firebase Authentication.');
    console.error('   3. Re-run: node migrate_mongo_to_firestore.js\n');
  }
  process.exit(1);
});
