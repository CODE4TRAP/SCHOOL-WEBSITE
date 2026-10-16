# 🏫 Swami Shiwanand Academy & Kid's Play School — Enterprise Web Application

A modern, responsive, high-aesthetic educational web application built with **React 18**, **Material Design 3 (M3) Design System**, **Express.js**, and **MongoDB Atlas** cloud database.

---

## 🌟 Key Features & Recent Highlights

### 1. 🔐 Fluted Neon Admin Portal (`/admin/login`)
- **Split-Screen Executive Glassmorphic Interface**: Left panel features atmospheric architectural fluted glass and neon light visual art; right panel delivers an ultra-clean, frosted glassmorphic credential card.
- **One-Click Demo Access**: Instant auto-fill credential pill (`Demo Master Login`) for rapid testing.
- **Enhanced Security & Usability**: Password visibility toggle, real-time input status indicator, and security credential badges.
- **Live Administration Control**: Filter admission applications, manage notice board broadcasts, and update contact inquiries in real-time.

### 2. 📝 Streamlined Admission Station & Instant Receipt Slip (`/admission`)
- **Intuitive Step-by-Step Flow**: Guided application process with instant form validation and progress tracking.
- **Instant Digital Receipt**: On submission, parents receive a beautifully styled, printable confirmation receipt complete with unique Application ID, timestamps, and applicant details.
- **Direct WhatsApp Verification**: One-click WhatsApp action pre-filled with application ID and student details for immediate desk verification.

### 3. 📢 Real-Time Announcements & Notice Ticker
- **Dynamic News Ticker**: Smooth ticker at the top with category badges (`Urgent`, `Event`, `Academic`) and responsive overflow protection.
- **Notice Board Modal System**: Interactive dialog to view full circulars, download datesheets, and read administrative notices.
- **Mobile-First Topbar**: Ultra-compact single-line responsive header designed for zero overlap on all mobile screen sizes.

### 4. 🏛️ Enhanced Institutional Profile & Facilities (`/about` & `/facilities`)
- **Pedagogical Vision & Philosophy**: Founder's mission statement, core educational values, and interactive milestone timeline.
- **Facilities Showcase**: Category-based showcase covering Smart Classrooms, Robotics & STEM Lab, Sports Arena, and Kid's Play Zone.
- **Campus Virtual Tour Preview**: High-engagement video tour preview modal.

---

## 🔐 Admin Login Credentials

| Attribute | Details |
| :--- | :--- |
| **Login Route** | [`/admin/login`](http://localhost:3000/admin/login) |
| **Dashboard Route** | [`/admin/dashboard`](http://localhost:3000/admin/dashboard) |
| **Master Username** | `admin` |
| **Master Password** | `admin123` |
| **Quick Action** | Click the **"Fill Demo Master Credentials"** chip on the login card |

---

## 🗄️ Database & Backend Details

- **Database Engine**: MongoDB Atlas Cloud
- **Connection URI**: Configured via secure environment variables (`mongodb+srv://...`)
- **Backend API Port**: `http://localhost:5000` (proxied in Vite config via `/api`)

### Database Collections & Architecture
1. **Admissions (`Admission.js`)**: Real-time storage of student application records. Admins can filter by class (`Nursery` to `Class X`) or status (`Pending`, `Approved`, `Contacted`, `Rejected`), update administrative notes, and print official admission receipts.
2. **Notices & Circulars (`Notice.js`)**: Live school circulars published by administrators that feed both the website ticker and the interactive Notice Board modal.
3. **Inquiries (`Inquiry.js`)**: Parent queries from the Contact page logged directly to MongoDB with options to reply via WhatsApp or update status (`New`, `Responded`, `Archived`).
4. **Admin Accounts (`Admin.js`)**: Pre-seeded default credentials for institutional administration.

---

## 🎨 Design System & Aesthetics

- **Color System**: Google Material Design 3 tokens with Primary Blue (`#0b57d0`), Soft Tonal Container (`#d3e3fd`), Warm Accent Gold (`#f9ab00`), and dark executive contrast surfaces.
- **Elevation & Depth**: Layered backdrop blur (`backdrop-filter: blur(24px)`), ambient glow orbs, and fine-line semi-transparent borders (`rgba(255, 255, 255, 0.14)`).
- **Typography**: Responsive typographic scale pairing Outfit and Google Sans / Inter for clear visual hierarchy.
- **Micro-Interactions**: Smooth hover elevations, button ripple effects, and transition curves across all interactive elements.

---

## 🚀 Running the Project Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Both Frontend & Backend

**Terminal 1 — Frontend Client (Vite Dev Server):**
```bash
npm run dev
```

**Terminal 2 — Backend Server (Express + MongoDB):**
```bash
npm run server
```

### 3. Production Build
```bash
npm run build
```

---

## 📂 Project Directory Structure

```
├── public/                  # Static assets & brand imagery
│   └── images/              # Optimized campus & visual art assets
├── server/                  # Express & MongoDB backend
│   ├── config/              # Database connection logic
│   ├── models/              # Mongoose schemas (Admission, Notice, Inquiry, Admin)
│   └── index.js             # API route controllers & server listener
├── src/
│   ├── components/          # Reusable UI components (Navbar, Footer, Modals, Ticker)
│   ├── pages/               # Application views
│   │   ├── Home.jsx         # Hero showcase, Quick Inquiry & Features
│   │   ├── About.jsx        # History, Founder's vision, Milestones
│   │   ├── Admission.jsx    # Online registration wizard & WhatsApp slip
│   │   ├── Facilities.jsx   # Campus infrastructure & interactive tour
│   │   ├── Contact.jsx      # Google map, inquiries & direct channels
│   │   └── admin/
│   │       ├── AdminLogin.jsx      # Fluted neon glassmorphic login
│   │       └── AdminDashboard.jsx  # Control panel & record management
│   ├── App.jsx              # Client routing & layout wrapper
│   ├── index.css            # Design system tokens, utilities & component styling
│   └── main.jsx             # React entry point
└── package.json
```

---

## 📄 License
This project is licensed under the ISC License. Maintained by **Swami Shiwanand Academy & Kid's Play School**.
