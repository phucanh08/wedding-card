#!/usr/bin/env node
// Export Firestore collections (guests, rsvp, wishes) -> data/*.json
// Đọc công khai qua REST API bằng API key trong docs/firebase-config.js.
// Dùng: node scripts/export-firestore.mjs

import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT = 'wedding-card-cdcce';
const API_KEY = 'AIzaSyDy3QBcu_bEFdiBhRHVGdEi2G5vVdF0wXM';
const COLLECTIONS = ['guests', 'rsvp', 'wishes'];

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = resolve(ROOT, 'data');
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;

// Làm phẳng 1 giá trị Firestore (typed value) -> giá trị JS thường
function unwrap(v) {
  if (v == null) return null;
  if ('stringValue' in v) return v.stringValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('timestampValue' in v) return v.timestampValue;
  if ('nullValue' in v) return null;
  if ('referenceValue' in v) return v.referenceValue;
  if ('geoPointValue' in v) return v.geoPointValue;
  if ('bytesValue' in v) return v.bytesValue;
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(unwrap);
  if ('mapValue' in v) return unwrapFields(v.mapValue.fields || {});
  return v;
}
function unwrapFields(fields) {
  const o = {};
  for (const [k, val] of Object.entries(fields)) o[k] = unwrap(val);
  return o;
}

async function fetchCollection(name) {
  const docs = [];
  let pageToken = '';
  do {
    const url = new URL(`${BASE}/${name}`);
    url.searchParams.set('key', API_KEY);
    url.searchParams.set('pageSize', '300');
    if (pageToken) url.searchParams.set('pageToken', pageToken);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${name}: HTTP ${res.status} ${await res.text()}`);
    const data = await res.json();
    for (const d of data.documents || []) {
      docs.push({ id: d.name.split('/').pop(), ...unwrapFields(d.fields || {}) });
    }
    pageToken = data.nextPageToken || '';
  } while (pageToken);
  return docs;
}

function sortByTime(arr) {
  return arr.sort((a, b) => String(a.createdTime || '').localeCompare(String(b.createdTime || '')));
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const summary = {};
  for (const name of COLLECTIONS) {
    let docs = await fetchCollection(name);
    docs = name === 'guests'
      ? docs.sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''), 'vi'))
      : sortByTime(docs);
    await writeFile(resolve(OUT_DIR, `${name}.json`), JSON.stringify(docs, null, 2) + '\n', 'utf8');
    summary[name] = docs.length;
    console.log(`  ${name.padEnd(7)} ${docs.length} docs -> data/${name}.json`);
  }
  await writeFile(
    resolve(OUT_DIR, 'export-meta.json'),
    JSON.stringify({ project: PROJECT, exportedAt: new Date().toISOString(), counts: summary }, null, 2) + '\n',
    'utf8'
  );
  console.log('Done.', JSON.stringify(summary));
}

main().catch((e) => { console.error(e); process.exit(1); });
