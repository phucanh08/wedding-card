// Test đầy đủ Firestore Security Rules bằng Firebase Emulator (offline, không đụng production).
// Dùng @firebase/rules-unit-testing + serverTimestamp() thật -> kiểm chứng được cả ghi-hợp-lệ.
// Chạy: npm run test:rules   (firebase emulators:exec sẽ tự khởi động emulator)

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import {
  collection, doc, getDocs, addDoc, setDoc, updateDoc, deleteDoc, serverTimestamp,
} from 'firebase/firestore';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

const testEnv = await initializeTestEnvironment({
  projectId: 'demo-wedding',
  firestore: { rules: readFileSync(resolve(ROOT, 'firestore.rules'), 'utf8') },
});

let pass = 0, fail = 0;
const note = (ok, label, detail = '') => {
  console.log(`${ok ? '✅' : '❌'} ${label}${detail ? '  — ' + detail : ''}`);
  ok ? pass++ : fail++;
};
async function shouldPass(label, p) {
  try { await assertSucceeds(p); note(true, label); }
  catch (e) { note(false, label, 'bị từ chối (mong đợi PASS): ' + String(e.message || e).slice(0, 90)); }
}
async function shouldFail(label, p) {
  try { await assertFails(p); note(true, label); }
  catch { note(false, label, 'KHÔNG bị chặn (mong đợi FAIL)'); }
}

const db = testEnv.unauthenticatedContext().firestore();

console.log('\n— READ (cho phép) —');
for (const c of ['guests', 'rsvp', 'wishes']) await shouldPass(`READ ${c}`, getDocs(collection(db, c)));

console.log('\n— CREATE hợp lệ (serverTimestamp) — app thật phải chạy được —');
await shouldPass('CREATE guests hợp lệ',
  addDoc(collection(db, 'guests'), { name: 'Khách Test', createdTime: serverTimestamp() }));
await shouldPass('CREATE rsvp hợp lệ',
  addDoc(collection(db, 'rsvp'), { guestName: 'Khách Test', confirmStatus: 'Y', numOfPerson: '2', guestId: 'abc', _name: 'Khách Test', createdTime: serverTimestamp() }));
await shouldPass('CREATE rsvp (confirmStatus N)',
  addDoc(collection(db, 'rsvp'), { guestName: 'Khách Test', confirmStatus: 'N', numOfPerson: '', guestId: 'abc', _name: 'Khách Test', createdTime: serverTimestamp() }));
await shouldPass('CREATE wishes hợp lệ',
  addDoc(collection(db, 'wishes'), { name: 'Khách Test', content: 'Chúc mừng hạnh phúc!', createdTime: serverTimestamp() }));

console.log('\n— CREATE không hợp lệ (phải bị chặn) —');
await shouldFail('thiếu createdTime',
  addDoc(collection(db, 'wishes'), { name: 'a', content: 'b' }));
await shouldFail('có field lạ (evil)',
  addDoc(collection(db, 'wishes'), { name: 'a', content: 'b', evil: 'x', createdTime: serverTimestamp() }));
await shouldFail('content > 1000 ký tự',
  addDoc(collection(db, 'wishes'), { name: 'a', content: 'x'.repeat(1001), createdTime: serverTimestamp() }));
await shouldFail('timestamp giả (không phải serverTimestamp)',
  addDoc(collection(db, 'wishes'), { name: 'a', content: 'b', createdTime: new Date() }));
await shouldFail('name rỗng',
  addDoc(collection(db, 'wishes'), { name: '', content: 'b', createdTime: serverTimestamp() }));
await shouldFail('rsvp confirmStatus sai',
  addDoc(collection(db, 'rsvp'), { guestName: 'a', confirmStatus: 'HACK', numOfPerson: '1', guestId: 'a', _name: 'a', createdTime: serverTimestamp() }));
await shouldFail('collection lạ (admin)',
  addDoc(collection(db, 'admin'), { x: '1', createdTime: serverTimestamp() }));

console.log('\n— UPDATE / DELETE (phải bị chặn) —');
await testEnv.withSecurityRulesDisabled(async (ctx) => {
  await setDoc(doc(ctx.firestore(), 'wishes/seed1'), { name: 'seed', content: 'seed', createdTime: serverTimestamp() });
});
await shouldFail('UPDATE wishes', updateDoc(doc(db, 'wishes/seed1'), { name: 'hacked' }));
await shouldFail('DELETE wishes', deleteDoc(doc(db, 'wishes/seed1')));

console.log(`\nKết quả: ${pass} pass, ${fail} fail`);
await testEnv.cleanup();
process.exit(fail ? 1 : 0);
