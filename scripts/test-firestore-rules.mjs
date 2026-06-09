#!/usr/bin/env node
// Test Firestore Security Rules qua REST API (an toàn, không tạo rác).
// LƯU Ý: rule yêu cầu createdTime == request.time (serverTimestamp của SDK).
// REST không tạo được giá trị đó -> mọi create qua REST đều bị từ chối;
// nên file này test: READ cho phép, UPDATE/DELETE bị chặn, CREATE giả mạo bị chặn.
// Ghi hợp lệ chỉ kiểm chứng được qua app thật hoặc Firebase Emulator.

const PROJECT = 'wedding-card-cdcce';
const KEY = 'AIzaSyDy3QBcu_bEFdiBhRHVGdEi2G5vVdF0wXM';
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;

// 1 doc thật để test update không phá dữ liệu (set lại đúng giá trị cũ)
const REAL_WISH = { id: 'YClmVjO5E4hI3sY3sLwH', name: 'Quang A1' };

let pass = 0, fail = 0;
function check(name, ok, detail) {
  console.log(`${ok ? '✅' : '❌'} ${name}${detail ? '  — ' + detail : ''}`);
  ok ? pass++ : fail++;
}

async function status(method, path, body) {
  const res = await fetch(`${BASE}${path}${path.includes('?') ? '&' : '?'}key=${KEY}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.status;
}

async function main() {
  // --- READ: phải cho phép (200) ---
  for (const c of ['guests', 'rsvp', 'wishes']) {
    const s = await status('GET', `/${c}?pageSize=1`);
    check(`READ ${c} được phép`, s === 200, `HTTP ${s}`);
  }

  // --- DELETE: phải bị chặn (403). Dùng id không tồn tại -> không phá dữ liệu ---
  for (const c of ['guests', 'rsvp', 'wishes']) {
    const s = await status('DELETE', `/${c}/zNonexistentTestId000`);
    check(`DELETE ${c} bị chặn`, s === 403, `HTTP ${s} (mong đợi 403)`);
  }

  // --- UPDATE: phải bị chặn (403). PATCH set lại ĐÚNG giá trị cũ -> vô hại nếu lỡ qua ---
  {
    const s = await status(
      'PATCH',
      `/wishes/${REAL_WISH.id}?updateMask.fieldPaths=name`,
      { fields: { name: { stringValue: REAL_WISH.name } } }
    );
    check('UPDATE wishes bị chặn', s === 403, `HTTP ${s} (mong đợi 403)`);
  }

  // --- CREATE giả mạo qua REST: phải bị chặn ---
  const forged = [
    ['wishes có timestamp giả', '/wishes', {
      fields: { name: { stringValue: 'x' }, content: { stringValue: 'y' },
                createdTime: { timestampValue: '2030-01-01T00:00:00Z' } },
    }],
    ['wishes thiếu createdTime', '/wishes', {
      fields: { name: { stringValue: 'x' }, content: { stringValue: 'y' } },
    }],
    ['wishes có field lạ', '/wishes', {
      fields: { name: { stringValue: 'x' }, content: { stringValue: 'y' },
                evil: { stringValue: '1' }, createdTime: { timestampValue: '2030-01-01T00:00:00Z' } },
    }],
    ['rsvp confirmStatus sai', '/rsvp', {
      fields: { guestName: { stringValue: 'x' }, confirmStatus: { stringValue: 'HACK' },
                numOfPerson: { stringValue: '1' }, guestId: { stringValue: 'a' },
                _name: { stringValue: 'x' }, createdTime: { timestampValue: '2030-01-01T00:00:00Z' } },
    }],
  ];
  for (const [label, path, body] of forged) {
    const s = await status('POST', path, body);
    check(`CREATE ${label} bị chặn`, s === 403, `HTTP ${s} (mong đợi 403)`);
  }

  console.log(`\nKết quả: ${pass} pass, ${fail} fail`);
  process.exit(fail ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
