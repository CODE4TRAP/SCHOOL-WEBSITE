# Material Design 3 Enhancement Roadmap & Checklist

> **Swami Shiwanand Academy & Kid's Play School**  
> *Final Verified State & Execution Summary*  
> **Status:** 100% Completed & Verified in Live Browser  
> **Date:** October 15, 2026

---

## 1. Generated Assets Catalog (Saved in `public/images/`)

All images have been generated with professional photography aesthetics and copied directly to `public/images/`:

| File Name | Purpose / Replaces | Description |
| :--- | :--- | :--- |
| `about_school.jpg` | Replaces `about_school.svg` on Home | Prestigious 2-story campus with manicured green lawns and students |
| `principal.jpg` | Replaces `principal.svg` on Home & About | Dignified portrait of educator / principal in library office |
| `facility_smart_class.jpg` | Replaces `slider3.svg` in Facilities & Gallery | Smart interactive digital board with teacher & primary kids |
| `facility_montessori.jpg` | Replaces `slider4.svg` in Facilities & Gallery | Montessori playroom with cushioned floor, ball pool & slides |
| `facility_science.jpg` | Replaces `slider1.svg` in Facilities | Kids science discovery table with microscopes & plant models |
| `facility_computer.jpg` | Replaces `slider2.svg` in Facilities | Ergonomic computer lab with monitors, headphones & children |
| `facility_transport.jpg` | Replaces `front_banner.jpg` in Facilities | Clean yellow school bus fleet with female attendant & students |
| `facility_safety.jpg` | Replaces `about_school.svg` in Facilities | Modern CCTV control room with security check-in kiosk |

---

## 2. Completed & Verified Implementation

### A. Global Navigation & Styling (`src/index.css`)
- [x] **Navbar Pill Highlight ("Just like Home highlight all of them")**:
  - Updated `.m3-nav-link` so each menu item (`About Us`, `General Info`, `Admission`, `Facilities`, `Gallery`, `Contact`) has a subtle pill chip background (`var(--md-surface-container)`) with crisp hover and active pill states (`var(--md-primary-container)`).
- [x] **Remove Animations ("Remove Animations")**:
  - In `.stat-box` and `.stat-icon-box`, removed `translateY(-8px)`, `rotate(5deg)`, and `scale(1.1)`. Preserved solid, static, clean Material 3 elevated metric cards.
- [x] **Material Symbols CSS Definition**:
  - Enforced `.material-symbols-outlined { font-family: 'Material Symbols Outlined', 'Material Icons' !important; }` to eliminate textual fallback glitches.
- [x] **Universal Section Header Box (`.section-header-box`)**:
  - Polished Material 3 card container (`background: var(--md-surface); border-left: 5px solid var(--md-primary); border-radius: 16px; padding: 18px 24px; box-shadow: 0 4px 18px rgba(11,87,208,0.06);`) with icon box (`.header-icon-box`), bold title (`.header-title`), and descriptive subtitle (`.header-subtitle`).
- [x] **Modern Breadcrumb ("In Diff Design")**:
  - Clean frosted-glass pill (`background: rgba(255,255,255,0.14); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.24); border-radius: 9999px;`) without awkward dark outer capsules or rectangular title borders.

---

### B. Homepage (`src/pages/Home.jsx`)
- [x] Replaced `about_school.svg` with `/images/about_school.jpg`.
- [x] Replaced `principal.svg` with `/images/principal.jpg`.
- [x] **Bulletin Card Fix**: Balanced 3-column cards (`col-lg-4` each for About, Principal, and Bulletin) with matching header styles and heights.
- [x] Added `.section-header-box` for Quick Portals & Services, Leadership Messages, Inside School, Faculty, and Gallery.
- [x] **Notice Board Arrow & Title in Single Line**: Arrow forward `[ → ]` and title text strictly rendered on one horizontal line.

---

### C. About Us (`src/pages/About.jsx`)
- [x] **Removed Extra Outer Capsule**: Removed dark background from `.m3-header-badges-box` and removed rectangular border around `.m3-header-title-box`.
- [x] Replaced `principal.svg` with `/images/principal.jpg`.
- [x] Added `.section-header-box` for:
  - Genesis & Vision
  - Principal's Message
  - Aims & Objectives
  - Faculty & Mentors
  - School Routine & Uniform
  - Upcoming Holidays & Vacations

---

### D. Admissions & Enrollment (`src/pages/Admission.jsx`)
- [x] Added `.section-header-box` separating title & subtitle for:
  - Online Student Registration Portal
  - Quick Fee Estimator
  - Complete Fee Schedule
  - Age Eligibility Criteria
  - Authorized School Bank & UPI Accounts
- [x] **WhatsApp Box ("In Box")**: Wrapped `Send Screenshot to +91 94310 68033` into dedicated `.whatsapp-action-box`.

---

### E. Facilities & Infrastructure (`src/pages/Facilities.jsx`)
- [x] Added `.section-header-box` for "World-Class Infrastructure For Early Learners".
- [x] Added `.section-header-box` for "Special Campus Highlights & Care".
- [x] **Separate Highlights into Boxes ("Should be in box & seperated")**: Separated Purified RO Water, First-Aid Infirmary, and Fire Safety into 3 distinct elevated `.campus-highlight-card` elements with dedicated badges and icons.

---

### F. Gallery (`src/pages/Gallery.jsx`)
- [x] **Video Highlights Text ("Use Box for Main Texts")**: Wrapped video preview, badges, title ("Annual Cultural Fest & Kids Drama"), and descriptions into structured `.video-highlight-card` boxes.
- [x] Used photorealistic 4K preview assets (`facility_smart_class.jpg`, `facility_montessori.jpg`).

---

### G. Contact & Campus Location (`src/pages/Contact.jsx`)
- [x] **"Box Missing"**: Added `.section-header-box` for "Get In Touch".
- [x] Added `.section-header-box` for "Send Us An Inquiry".
- [x] Put the 4 contact channels (Address, Phones, Email, Hours) into 4 distinct elevated cards (`.contact-channel-card`).
- [x] **WhatsApp Box ("Fix")**: Wrapped `Prefer instant messaging? Chat Directly on WhatsApp` into `.whatsapp-action-box`.

---

### H. Mandatory Disclosure (`src/pages/MandatoryDisclosure.jsx`)
- [x] **"Fix Blank Portion"**: Seamless transition from filter pills directly to regulatory tables without awkward empty spaces.
- [x] Added `.section-header-box` for "Statutory Transparency & Regulatory Disclosures".
- [x] Standardized subpage header with frosted-glass breadcrumb pill.

---

### I. Principal Showcase & Nameplate Architecture (`src/pages/About.jsx` & `src/index.css`)
- [x] **"SHOW PROPERLY" (From Principal's Desk)**:
  - Replaced clumsy wrapped text with a dedicated Material 3 `.principal-nameplate-box`.
  - Added golden `Leadership Desk` badge, bold navy heading, amber divider, structured school name, and location pill.
  - Upgraded portrait avatar with golden halo outline and verified leadership shield badge.
  - Implemented `.principal-showcase-grid` creating a side-by-side card with an amber-bordered quote box.
  - Fixed standard 12-column responsive grid system (`.col-1` to `.col-12`, `.col-md-*`, `.col-lg-*`) in `src/index.css`.

---

### J. Faculty & Mentors Showcase Architecture (`src/pages/About.jsx`, `src/data/content.js`, `src/index.css`)
- [x] **"ALSO SHOW THEM PROPERLY" (Faculty & Mentors)**:
  - Replaced all 6 cartoon SVG placeholders with photorealistic 4K portraits (`teacher_sunita.jpg`, `teacher_rajesh.jpg`, `teacher_priya.jpg`, `teacher_anjali.jpg`, `teacher_kavita.jpg`, `teacher_vikas.jpg`).
  - Added verified educator check badge with crisp circular frame and accent border.
  - Designed dedicated `.faculty-showcase-card` with high-contrast role chip (`.faculty-role-chip`) and verified shield icon.
  - Integrated educational philosophy quotes (`.faculty-quote-text`) with amber callout border.
  - Added specialization badges (`.faculty-specialty-badge`) and permanent faculty status pills in the card footer.

---

### K. Admission Registration Portal Console Architecture (`src/pages/Admission.jsx` & `src/index.css`)
- [x] **"DIFFERENT APPROACH FOR THIS" (Online Registration Portal)**:
  - Eliminated the duplicate/broken `.card-header` and redundant outer section header box.
  - Implemented the unified `.portal-console-card` with an authoritative deep navy/sapphire gradient banner (`.portal-console-header`).
  - Added golden glowing icon halo (`how_to_reg`), bold white title, and active pulsing status pill (`PORTAL ACTIVE`).
  - Integrated a 3-step navigation stepper (`.portal-steps-nav`) guiding users through Student Details, Parent Information, and Logistics.
  - Structured form inputs into 3 elevated Material 3 field clusters (`.portal-field-cluster`): Candidate Information, Parent Credentials, and Residence/Transport.
  - Added fallback alias variables `--primary-blue` and `--primary-dark` to `:root` in `src/index.css`.

---

### L. 3-Step Remittance Process Stepper Architecture (`src/pages/Admission.jsx` & `src/index.css`)
- [x] **"BETTER STYLING DESIGN FOR THIS" (Fee Remittance Steps 01, 02, 03)**:
  - Replaced plain white boxes with distinct, color-accented Material 3 cards (`.remittance-step-card` & `.remittance-steps-grid`).
  - **Step 1 (Blue)**: Top gradient accent, `payments` icon box, `STEP 01 OF 03` chip, bold title, and `UPI & Net Banking` tag.
  - **Step 2 (Amber)**: Top gradient accent, `receipt_long` icon box, `STEP 02 OF 03` chip, bold title, and `12-Digit UTR Proof` tag.
  - **Step 3 (Green)**: Top gradient accent, `mark_chat_read` icon box, `STEP 03 OF 03` chip, bold title, and `Instant Stamp Confirmation` tag.
  - Added smooth lift hover interaction (`translateY(-5px)`) and subtle card elevation.

---

### M. Contact Hub Cards Architecture (`src/pages/Contact.jsx` & `src/index.css`)
- [x] **"FIX PROPERLY & REDESIGN IT" (4 Contact Channel Cards)**:
  - **Identified & Fixed Root Issues**:
    - Eliminated inline text concatenations (`+91 94310 68033+91 88092 26820` and `info@swamishivanandschool.comad...`).
    - Resolved card squeezing by shifting desktop layout balance to `col-lg-7` (contact info & map) + `col-lg-5` (inquiry form).
    - Designed stacked micro-action cards (`.contact-action-card`) preventing any text wrapping or overflow bugs.
  - **Material 3 Contact Hub Cards (`.contact-hub-card`)**:
    - **Card 1: Campus Address (`hub-blue`)**: Sapphire top accent, `location_on` halo, copy address chip, formatted address, and `Get Driving Directions →` action link.
    - **Card 2: Direct Helplines (`hub-green`)**: Emerald top accent, `call` halo, copy primary helpline chip, two separate stacked micro-action cards with `Principal & Admin` / `Admissions Desk` tags, vibrant `CALL` pill buttons, and tap-to-dial `tel:` links.
    - **Card 3: Official Inquiries (`hub-amber`)**: Amber top accent, `mail` halo, copy primary email chip, two separate stacked micro-action cards with `General Inquiries` / `Admissions Desk` tags, `EMAIL` pill buttons, and tap-to-email `mailto:` links with clean font sizing.
    - **Card 4: Office & Visiting Hours (`hub-rose`)**: Crimson top accent, `schedule` halo, pulsing green `Open Today` status chip, structured `MON – SAT` schedule box (`08:00 AM – 02:00 PM`), and subtle dashed notice box for Sunday/holiday policies.

---

### N. Leadership Showcase & Notice Board Time Architecture (`src/pages/Home.jsx`, `src/components/NoticeBoard.jsx`, `src/index.css`)
- [x] **"REDESIGN" (About Our School, Principal's Message, Bulletin & Announcements)**:
  - **Card 1: About Our School (`.leadership-showcase-card.card-blue`)**: Sapphire top accent line, `school` icon halo, uppercase category tag `FOUNDATION & VISION`, bold navy title, `ESTD. 2009` badge, hover image zoom with floating `Smart Green Campus` frosted chip, foundational tags (`Smart Classrooms`, `Activity Labs`, `CCTV Secured`), and `Read Full Vision →` pill button.
  - **Card 2: Principal's Message (`.leadership-showcase-card.card-amber`)**: Warm amber top accent line, `account_circle` icon halo, uppercase category tag `LEADERSHIP DESK`, bold title, `LEADERSHIP` badge, hover image zoom with floating `Deepak Kumar • Principal` chip, amber callout quote box with decorative typography, value tags (`Value-Based Pedagogy`, `Holistic Growth`), and `Read Principal's Note →` button.
  - **Card 3: Bulletin Board (`.leadership-showcase-card.card-bulletin`)**: Golden emerald top accent line, executive midnight gradient background, golden megaphone halo (`campaign`), `INSTITUTIONAL CIRCULARS` tag, bold white title, pulsing `● LIVE` broadcast beacon, Deepkiran Educational Trust crest banner, 3 live announcement cards (`OLYMPIAD 2026`, `WORKSHOP`, `ADMISSIONS`) with color-coded stripes and schedule dates, and golden `Access OSM Portal Login →` button.
- [x] **"ALSO BETTER DESIGN FOR TIME" (Notice Board Date & Time Representation)**:
  - Replaced raw plain date text (`🕒05-10-2026`) with the formatted Material 3 `.notice-time-pill`.
  - Added `formatNoticeDate` helper resolving raw hyphens into readable month names (e.g. `05-10-2026` → `05 Oct 2026`).
  - Added dedicated calendar icon with proper spacing (`.notice-time-icon`).
  - Styled with soft slate background tint, subtle border, rounded pill capsule, and smooth hover transition.
  - Restructured `.notice-meta-row` pairing the time pill alongside the category pill and pulsing `NEW` badge.

---

### O. Interactive Fee Estimator Console Architecture (`src/pages/Admission.jsx` & `src/index.css`)
- [x] **"ENHANCE THIS SECTION" (Quick Fee Estimator Console)**:
  - **Identified & Fixed Calculation Bug**:
    - Fixed `selectedFee` substring bug where selecting `Nursery` matched `Playgroup (Pre-Nursery)`, returning incorrect fees (₹2,500 + ₹800). Resolved with exact class matcher (`f.class === 'Nursery'` → ₹2,800 + ₹900).
  - **Executive Console Shell (`.estimator-console-card`)**:
    - Emerald-to-sapphire top gradient line (`linear-gradient(90deg, #10b981 0%, #0b57d0 100%)`).
    - Dedicated header with glowing calculator halo (`calculate`), uppercase `FINANCIAL CALCULATOR • SESSION 2026–27`, bold navy title, and `Transparent CBSE Pattern Scale` badge.
  - **Interactive Controls (Left Panel)**:
    - Custom styled class selector with grade ages and dynamic wing pill tag (`Selected Wing: Pre-Primary Early Foundation`).
    - Interactive Transport Toggle Card (`.estimator-transport-card`): Clickable card with bus icon, title, description, `+₹600 / mo` rate tag, and an animated toggle switch with green active feedback.
  - **Live Breakdown Display (Right Panel)**:
    - High-contrast summary panel with `ESTIMATED 1ST MONTH TOTAL` label and pulsing `● INSTANT CALCULATION` badge.
    - Big emerald currency display (`₹ 4,300` / `₹ 3,700`).
    - Itemized breakdown table: One-time admission fee, 1st month tuition, and transport (school bus).
    - Recurring monthly fee card (`Recurring Fee from 2nd Month onwards: ₹ 1,500 / month`).
    - High-visibility action button: `Proceed with [Class] Admission →` linking to the registration form.

---

### P. Admission Sidebar Architecture (`src/pages/Admission.jsx` & `src/index.css`)
- [x] **"REDESING THESE TWO" (Documents Required Checklist & Admission Helpdesk)**:
  - **Card 1: Documents Required (`.doc-checklist-card`)**:
    - Sapphire top gradient bar with `folder_shared` halo, `VERIFICATION CHECKLIST` category tag, and `6 Key Items` counter badge.
    - Guidance pill alert: *"Keep 1 self-attested photocopy set along with original certificates for verification."*
    - Structured, numbered item rows (01 to 06) with subtle hover lift and colored tags:
      1. **Municipal Birth Certificate**: Tagged `Mandatory` (crimson badge).
      2. **Student Photographs**: Tagged `4 Copies` (slate badge).
      3. **Parents' Photographs**: Tagged `2 Copies` (slate badge).
      4. **Aadhaar Card (ID Proof)**: Tagged `Mandatory` (crimson badge).
      5. **Immunization Record**: Tagged `Health Record` (slate badge).
      6. **TC & Report Card**: Tagged `Std I & Above` (amber badge).
    - Attestation assistance reassurance footer note with verified checkmark.
  - **Card 2: Admission Helpdesk (`.admission-helpdesk-card`)**:
    - Emerald top gradient bar with `support_agent` halo, `ADMISSION COUNSELING` category tag, and pulsing live beacon `● Open Today`.
    - Operating hours chip (`Mon – Sat: 08:00 AM – 02:00 PM`) and concise descriptive counseling text.
    - Direct tap-to-dial action cards (`.helpdesk-contact-action`):
      - Helpline 1: `COUNSELING DESK • DIRECT` (`+91 94310 68033`) with `CALL →` pill button.
      - Helpline 2: `ADMIN • PRINCIPAL OFFICE` (`+91 88092 26820`) with `CALL →` pill button.
      - WhatsApp Desk (`.helpdesk-whatsapp-action`): Official WhatsApp brand green styling with direct link and `CHAT` pill button.
    - High-contrast gradient CTA button: `Send Detailed Admission Inquiry →` linking directly to `/contact`.

---

### Q. Aims & Objectives 4-Pillar Showcase Architecture (`src/pages/About.jsx` & `src/index.css`)
- [x] **"REDESIGN" (Aims & Objectives Foundational Pillars)**:
  - **Identified & Replaced**:
    - Legacy plain 2x2 grid (`p-3 bg-white border`) with checkmark icons replaced by Material 3 `.aims-pillar-card` suite.
  - **Pillar 1: Cognitive Excellence (`.aims-pillar-card.pillar-blue`)**:
    - Sapphire top gradient bar, `psychology` icon halo, `PILLAR 01 • INTELLECTUAL FOUNDATION` category tag, `01 / 04` index pill.
    - Title & subtitle: *Cognitive Excellence • Analytical Thinking & Early Literacy*.
    - Micro-chips: `Phonics & Rhymes`, `Number Fluency`, `Curiosity Labs`.
    - Footer: `Montessori Integrated` verified badge + `Pre-Primary & Primary`.
  - **Pillar 2: Moral & Spiritual Values (`.aims-pillar-card.pillar-amber`)**:
    - Warm amber top gradient bar, `self_improvement` halo, `PILLAR 02 • ETHICAL SANSKAR & CULTURE` tag, `02 / 04` index pill.
    - Title & subtitle: *Moral & Spiritual Values • Virtues & Cultural Heritage*.
    - Micro-chips: `Compassion & Empathy`, `Morning Prayer Assembly`, `Civic Respect`.
    - Footer: `Value-First Pedagogy` verified badge + `Daily Assemblies`.
  - **Pillar 3: Motor Skills & Kinesthetic Play (`.aims-pillar-card.pillar-emerald`)**:
    - Emerald top gradient bar, `sports_gymnastics` halo, `PILLAR 03 • PHYSICAL & AGILITY PLAY` tag, `03 / 04` index pill.
    - Title & subtitle: *Motor Skills & Play • Kinesthetic Agility & Fine Motor*.
    - Micro-chips: `Clay Modeling & Art`, `Obstacle Navigation`, `Sensory Agility`.
    - Footer: `Active Play Arenas` verified badge + `Weekly Sports Period`.
  - **Pillar 4: Holistic Well-Being (`.aims-pillar-card.pillar-cyan`)**:
    - Cyan-sky top gradient bar, `spa` halo, `PILLAR 04 • HEALTH & MINDFULNESS` tag, `04 / 04` index pill.
    - Title & subtitle: *Holistic Well-Being • Hygiene & Emotional Balance*.
    - Micro-chips: `Personal Hygiene`, `Health Checkups`, `Mindful Meditation`.
    - Footer: `Pediatric Monitored` verified badge + `Continuous Wellness`.
  - Added smooth card elevation (`translateY(-6px)`), top bar expansion, and halo rotation on hover.

---

### R. Institutional Vacations & Recesses Architecture (`src/pages/About.jsx` & `src/index.css`)
- [x] **"DIFF DESIGN" (Upcoming Holidays & Vacations Table Replacement)**:
  - **Identified & Replaced**:
    - Replaced the dry, static tabular Excel-like HTML table with the rich **Material 3 Seasonal Vacation Showcase (`.vacation-showcase-container`)**.
  - **Executive Calendar Banner (`.vacation-calendar-banner`)**:
    - `calendar_month` emerald halo, uppercase session subtitle `OFFICIAL ACADEMIC SCHEDULE • SESSION 2026–27`, bold title, and `51 Days Total Scheduled Recess` summary chip.
  - **4 Seasonal Vacation Cards (`.vacation-card`)**:
    - **1. Summer Vacation (`card-summer`)**: Amber/orange sun theme, `wb_sunny` icon halo, `SUMMER BREAK 2026` tag, amber `27 Days` badge, `25th May 2026 – 20th June 2026` date box with `Gazetted Recess` chip, and `Reopens: Mon, 22nd June 2026` footer note.
    - **2. Durga Puja & Dussehra Break (`card-autumn`)**: Crimson festive theme, `festival` icon halo, `AUTUMN FESTIVAL 2026` tag, crimson `7 Days` badge, `16th Oct 2026 – 22nd Oct 2026` date box with `Vijayadashami` chip, and `Reopens: Fri, 23rd Oct 2026` footer note.
    - **3. Diwali & Chhath Puja Holidays (`card-diwali`)**: Radiant violet/gold theme, `auto_awesome` icon halo, `FESTIVAL OF LIGHTS 2026` tag, purple `9 Days` badge, `08th Nov 2026 – 16th Nov 2026` date box with `Chhath Mahaparv` chip, and `Reopens: Tue, 17th Nov 2026` footer note.
    - **4. Winter Break & New Year (`card-winter`)**: Frost blue theme, `ac_unit` snowflake halo, `WINTER RECESS 2026–27` tag, sky-blue `8 Days` badge, `26th Dec 2026 – 02nd Jan 2027` date box with `New Year 2027` chip, and `Reopens: Mon, 04th Jan 2027` footer note.
  - **Administrative Reassurance Advisory (`.vacation-calendar-note`)**:
    - Soft blue alert box detailing district administrative notice coordination and school portal notification broadcasts.

---

### S. Sub-Page Hero Breadcrumb Contrast & Typography Fix (`src/index.css`)
- [x] **"TEXT TYPE LIKE HOME IS NOT EVEN READABLE" (Hero Breadcrumb Legibility)**:
  - **Identified Root Cause**:
    - `.m3-breadcrumb li a` had a legacy fallback rule pointing to `--md-on-surface-variant` (`#444746`, dark charcoal grey).
    - Against deep sapphire blue hero banners (`#0b57d0` / `#041e49`), dark grey had zero contrast and blended into the background.
  - **Applied Solution in `.m3-header-breadcrumb-box`**:
    - Scoped `.m3-header-breadcrumb-box .m3-breadcrumb li a` to pure crisp white (`#ffffff !important`) with bold `700` font weight and subtle text shadow (`0 1px 3px rgba(0,0,0,0.3)`).
    - Styled home icon (`.material-symbols-outlined`) to pure white (`#ffffff !important`).
    - Styled separator (`/`) to clean semi-transparent white (`rgba(255, 255, 255, 0.7)`).
    - Preserved active page indicator in glowing amber-gold (`#fef08a !important`) with `800` font weight.
    - Added golden hover state (`#fef08a !important`) for interactive links.
    - Verified across all 6 sub-page hero banners (`/about`, `/admission`, `/contact`, `/facilities`, `/gallery`, `/mandatory-disclosure`).

---

### T. Mandatory Disclosure Status Column Blank Space Fix (`src/index.css` & `src/pages/MandatoryDisclosure.jsx`)
- [x] **"WHY THERE IS BLANK SPACE" (Upload Status / Verification Column Bug)**:
  - **Identified Root Cause**:
    - In `MandatoryDisclosure.jsx`, document status cells contained `<span className="badge bg-success text-white px-3 py-1">Verified & Active</span>`.
    - Neither Bootstrap CSS nor custom rules existed in `src/index.css` for `.badge` or `.bg-success`.
    - However, `.text-white { color: #ffffff !important; }` **did** exist.
    - Consequently, status text rendered as **pure white `#ffffff` on an unstyled transparent background over a pure white table cell (`#ffffff`)**, rendering the entire status column 100% invisible and creating the appearance of empty blank space.
  - **Applied Systemic Solution**:
    - **Global Utility System (`src/index.css`)**:
      - Added standardized `.badge`, `.bg-primary`, `.bg-primary-subtle`, `.bg-success`, `.bg-success-subtle`, `.bg-danger`, `.bg-warning`, `.bg-info`, and `.bg-light` classes to protect the entire application against future missing-class bugs.
    - **Material 3 Document Status Badges (`.doc-status-badge.verified`)**:
      - Replaced raw spans with high-contrast emerald status chips featuring `#ecfdf5` background, `#6ee7b7` border, `#065f46` dark green text (WCAG AAA compliant), and green checkmark icons (`fa-check-circle`).
    - **Card Index Badges (`.doc-sno-badge`)**:
      - Styled S.No cells with circular numeric badges (`01` through `06`) on `#f1f5f9` soft fill.
    - **Thematic Document Icons (`.doc-name-icon`)**:
      - Added dedicated icon badges for each certificate type (`file-contract`, `certificate`, `award`, `hotel`, `fire-extinguisher`, `tint`).
    - **Enhanced Action Verification Buttons (`.doc-verify-btn`)**:
      - Upgraded the action button into an interactive shield pill (`fa-shield-alt`) with hover elevation and active certificate modal preview.
    - **Live Browser Verification**:
      - Verified across all 6 document verification rows with live browser screenshot and modal trigger test.

---

### U. Faculty & Mentors Illustrated Characters Restoration (`src/data/content.js`)
- [x] **"USE PREVIOUS CAHRACTERS I JUST WANTED TO REDESIGN STYLING NOT CHARACTERS"**:
  - **Identified Request**:
    - The user loved the custom vector-illustrated school teacher characters (`teacher1.svg` through `teacher6.svg`) featuring Indian cultural elements (bindi, saree, specs, tie, Montessori apron, sports coach whistle) and wanted them preserved inside the newly enhanced Material 3 card styling, rather than replaced with stock photos.
  - **Applied Changes**:
    - Restored all 6 educator avatar references in [content.js](file:///d:/TR4P/WEBSITES/AGENCY/MAKE%20WEBSITE%20IN%20REACT/src/data/content.js#L112-L168) to their original illustrated character SVGs:
      - `Mrs. Sunita Sharma` (Vice Principal) -> `/images/teacher1.svg`
      - `Mr. Rajesh Pandey` (Academic Head) -> `/images/teacher2.svg`
      - `Mrs. Priya Kumari` (Co-Ordinator) -> `/images/teacher3.svg`
      - `Ms. Anjali Verma` (Montessori Lead) -> `/images/teacher4.svg`
      - `Mrs. Kavita Singh` (Art & Music Head) -> `/images/teacher5.svg`
      - `Mr. Vikas Tiwari` (Sports & Yoga Coach) -> `/images/teacher6.svg`
    - Maintained all modern Material 3 card styling, verified checkmark badges, role chips, qualification tags, quotes, and specialty pills.
    - Verified on both [About.jsx](file:///d:/TR4P/WEBSITES/AGENCY/MAKE%20WEBSITE%20IN%20REACT/src/pages/About.jsx#L355) and [Home.jsx](file:///d:/TR4P/WEBSITES/AGENCY/MAKE%20WEBSITE%20IN%20REACT/src/pages/Home.jsx#L505).

---

### V. Mandatory Disclosure Comprehensive Card Suite Redesign (`src/pages/MandatoryDisclosure.jsx` & `src/index.css`)
- [x] **"FIX" (Mandatory Disclosure Architecture & Browser Cache Synchronization)**:
  - **Identified Request & Action**:
    - The user provided a screenshot of Sections A & B from `http://localhost:3000/mandatory-disclosure` where the browser tab held an unrefreshed state.
    - Performed a full architectural upgrade on all 5 disclosure sections (A, B, C, D, E) replacing raw Bootstrap cards with `.disclosure-table-card` containers and gradient headers.
  - **New Material 3 Architectural Elements**:
    - **Gradient Section Headers (`.disclosure-card-header`)**:
      - Sapphire blue gradient (`linear-gradient(135deg, #0b57d0 0%, #0842a0 100%)`) with frosted icon frames and uppercase regulatory tags:
        - Section A: `INSTITUTION OVERVIEW`
        - Section B: `STATUTORY CLEARANCES`
        - Section C: `EXECUTIVE TRUST BODY`
        - Section D: `ACADEMIC FACULTY`
        - Section E: `FACILITY SPECIFICATIONS`
    - **Structured Label Cells (`.disclosure-label-cell`)**:
      - High-contrast `#f8fafc` soft container background with dark `#1e293b` bold typography and subtle border separation.
    - **Verified Document Table (Section B)**:
      - All 6 regulatory document rows display circular index pills (`01`–`06`), thematic document icons, emerald status chips with checkmark icons (`Verified & Active`, `Granted`, etc.), and shield verify buttons.
    - **Live Browser Verification & Hard Reload**:
      - Triggered a direct reload on the user's active browser page (`http://localhost:3000/mandatory-disclosure`), confirming all 5 sections render with high contrast, vibrant status chips, and zero blank space.
