# Swami Shiwanand Academy & Kid's Play School — Material Design 3 Web Application

A modern, responsive, high-aesthetic React web application built with **React 18**, **Material Design 3 (M3) Design System**, **Express.js**, and **MongoDB Atlas** cloud database.

---

## 🔐 Admin Login Credentials
- **Admin Login Route:** [`/admin/login`](http://localhost:3000/admin/login)
- **Admin Dashboard Route:** [`/admin/dashboard`](http://localhost:3000/admin/dashboard)
- **Username:** `admin`
- **Password:** `admin123`

---

## 🗄️ Database & Backend Details
- **Database Engine:** MongoDB Atlas Cloud
- **Connection URI:** `mongodb+srv://CodeX:CodeX@codex-in3.evr1nui.mongodb.net/swami_shiwanand_db?retryWrites=true&w=majority&appName=CodeX-in3`
- **Status:** Connected & Seeded
- **Backend API Port:** `http://localhost:5000` (proxied via Vite on `/api`)

### Database Collections & Features
1. **Admissions (`Admission.js`)**: Parents' online applications are saved to MongoDB. The admin can filter by class or status (`Pending`, `Approved`, `Contacted`, `Rejected`), update review notes, print admission slips, and delete records.
2. **Notices & Circulars (`Notice.js`)**: Notices stored in MongoDB are loaded live on the website's Notice Board. Admins can publish, edit, or delete notices in real time.
3. **Inquiries (`Inquiry.js`)**: Messages submitted from the Contact page are recorded in MongoDB. Admins can respond via WhatsApp or update inquiry status (`New`, `Responded`, `Archived`).
4. **Admin Accounts (`Admin.js`)**: Pre-seeded with default administrator account.

---

## 🎨 Material Design 3 (M3) Enhancements
- **Color Roles & Tokens:** Modern Google Material 3 color system with primary blue (`#0b57d0`), soft tonal container (`#d3e3fd`), and gold accent (`#f9ab00`).
- **Surface Elevation:** Subtle elevation levels (`elevation-1` to `elevation-4`) replacing blocky legacy borders.
- **Corner Radii:** Material 3 pill shapes (`var(--md-shape-full)`) for buttons, chips, and segmented tabs; rounded cards (`16px - 28px`).
- **Interactive Components:**
  - Material 3 Segmented Filter Buttons
  - Tonal Icon Cards with hover elevation
  - Material Floating Action Buttons (FAB) for WhatsApp and Scroll-To-Top
  - Outlined Material text fields with focus glow
  - Material Dialogs & Modals with spring animations

---

## 🚀 Running the Project

### Start Both Frontend & Backend:
```bash
# Terminal 1 - Frontend Dev Server (Port 3000):
npm run dev

# Terminal 2 - Express & MongoDB Backend Server (Port 5000):
npm run server
```

### Production Build:
```bash
npm run build
```
