import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

process.env.PORT = '5555';
process.env.VERCEL = '1'; // prevent server from auto-listening on import

const { default: app } = await import('./server/index.js');
const { default: mongoose } = await import('mongoose');

const PORT = 5555;
const BASE_URL = `http://localhost:${PORT}`;

const server = app.listen(PORT, async () => {
  console.log(`Security Test Runner listening on port ${PORT}...`);
  // wait 2 seconds for MongoDB connection to settle
  setTimeout(runTests, 2000);
});

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = options.headers || {};
  if (options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  return { status: res.status, headers: res.headers, data };
}

async function runTests() {
  console.log('\n--- STARTING COMPREHENSIVE SECURITY VERIFICATION ---');
  let passed = 0;
  let failed = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName} - ${details}`);
      failed++;
    }
  }

  try {
    // 1. Security Headers Test (Helmet)
    const healthRes = await request('/api/health');
    assert(
      healthRes.headers.get('x-content-type-options') === 'nosniff',
      'Security Header: X-Content-Type-Options: nosniff present'
    );
    assert(
      healthRes.headers.get('x-frame-options') === 'SAMEORIGIN' || healthRes.headers.get('x-frame-options') === 'DENY',
      'Security Header: X-Frame-Options present'
    );

    // 2. Unauthenticated Access Blocked on Admin Endpoints
    const unauthStats = await request('/api/admin/stats');
    assert(unauthStats.status === 401, 'Unauthorized request to /api/admin/stats blocked with 401');

    const unauthAdmissions = await request('/api/admissions');
    assert(unauthAdmissions.status === 401, 'Unauthorized request to /api/admissions blocked with 401');

    const unauthInquiries = await request('/api/inquiries');
    assert(unauthInquiries.status === 401, 'Unauthorized request to /api/inquiries blocked with 401');

    const unauthPatchAdm = await request('/api/admissions/507f1f77bcf86cd799439011', {
      method: 'PATCH',
      body: { status: 'Approved' }
    });
    assert(unauthPatchAdm.status === 401, 'Unauthorized PATCH /api/admissions/:id blocked with 401');

    const unauthDeleteAdm = await request('/api/admissions/507f1f77bcf86cd799439011', {
      method: 'DELETE'
    });
    assert(unauthDeleteAdm.status === 401, 'Unauthorized DELETE /api/admissions/:id blocked with 401');

    // 3. Invalid/Expired Token Rejection
    const invalidTokenRes = await request('/api/admissions', {
      headers: { Authorization: 'Bearer this.is.an.invalid.token' }
    });
    assert(invalidTokenRes.status === 401, 'Tampered/invalid JWT token rejected with 401');

    // 4. Admin Authentication
    const failLogin = await request('/api/admin/login', {
      method: 'POST',
      body: { username: 'shiva@mail.com', password: 'wrongpassword' }
    });
    assert(failLogin.status === 401, 'Invalid credentials rejected with 401');

    const successLogin = await request('/api/admin/login', {
      method: 'POST',
      body: { username: 'shiva@mail.com', password: process.env.ADMIN_PASSWORD || 'check123' }
    });
    assert(
      successLogin.status === 200 && successLogin.data && Boolean(successLogin.data.token),
      'Valid admin login issues signed JWT token'
    );

    const adminToken = successLogin.data ? successLogin.data.token : null;

    // 5. Authenticated Access with JWT
    if (adminToken) {
      const authStats = await request('/api/admin/stats', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      assert(authStats.status === 200, 'Authenticated request to /api/admin/stats returns 200 OK');

      const authAdmissions = await request('/api/admissions', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      assert(authAdmissions.status === 200, 'Authenticated request to /api/admissions returns 200 OK');

      const authInquiries = await request('/api/inquiries', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      assert(authInquiries.status === 200, 'Authenticated request to /api/inquiries returns 200 OK');

      // 6. IDOR / Invalid ObjectId Protection
      const invalidIdRes = await request('/api/admissions/not-a-valid-id-12345', {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${adminToken}` },
        body: { status: 'Approved' }
      });
      assert(invalidIdRes.status === 400, 'Malformed MongoDB ObjectId rejected with 400 Bad Request');
    }

    // 7. Public Inquiries & Admissions (Data Integrity & Sanitization)
    const safeInquiry = await request('/api/inquiries', {
      method: 'POST',
      body: {
        name: 'Security Test Parent',
        phone: '9876543210',
        message: 'Testing inquiry submission flow',
        status: 'Responded', // Trying to inject status
        $where: 'this.password'
      }
    });
    assert(safeInquiry.status === 201, 'Public inquiry created with 201');

    // 8. Public Admission Submission & Mass-Assignment Prevention
    const safeAdmission = await request('/api/admissions', {
      method: 'POST',
      body: {
        studentName: 'Security Test Student',
        applyingClass: 'Std I',
        dob: '2020-05-15',
        motherName: 'Test Mother',
        fatherName: 'Test Father',
        mobile: '9876543210',
        status: 'Approved' // Attacker attempting mass-assignment
      }
    });
    assert(
      safeAdmission.status === 201 && safeAdmission.data.data.status === 'Pending',
      'Public admission mass-assignment prevented: Status strictly forced to "Pending"'
    );

  } catch (err) {
    console.error('Test execution error:', err);
    failed++;
  } finally {
    console.log(`\n===================================`);
    console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log(`===================================\n`);

    server.close();
    await mongoose.disconnect();
    process.exit(failed > 0 ? 1 : 0);
  }
}
