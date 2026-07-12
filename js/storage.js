
export const APP_VERSION = "5.2.0";
export const STORAGE_KEY = "pushpaPayrollHubV5";
export const PDF_DB = "pushpaPayrollHubV5Vault";
export const PDF_STORE = "pdfs";

export function round2(value){
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

function shiftedDate(dateValue, days){
  const date = new Date(`${dateValue}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export const initialRecords = [
  ["2026-03-27",929.59,500,13.48,57.63],
  ["2026-04-03",855.70,500,12.41,53.06],
  ["2026-04-10",838.29,500,12.15,51.97],
  ["2026-04-17",776.96,500,11.27,48.17],
  ["2026-04-24",694.71,500,10.07,43.08],
  ["2026-05-01",707.60,500,10.26,43.87],
  ["2026-05-08",828.09,500,12.01,51.34],
  ["2026-05-15",707.86,500,10.26,43.89],
  ["2026-05-22",742.41,500,10.77,46.03],
  ["2026-05-29",745.79,500,10.81,46.23],
  ["2026-06-05",677.11,500,9.82,41.98],
  ["2026-06-12",758.35,500,11.00,47.02],
  ["2026-06-18",739.61,500,10.72,45.86],
  ["2026-06-26",656.71,500,9.52,40.71],
  ["2026-07-03",738.01,500,10.70,45.76],
  ["2026-07-10",602.65,500,8.74,37.37]
].map(row => ({
  payDate: row[0],
  gross: row[1],
  federal: row[2],
  medicare: row[3],
  social: row[4],
  net: round2(row[1] - row[2] - row[3] - row[4]),
  periodStart: shiftedDate(row[0], -11),
  periodEnd: shiftedDate(row[0], -5)
}));

export function defaultState(){
  return {
    version: APP_VERSION,
    profile: {
      name: "Kumari Pushpa Rani",
      company: "Natera",
      joiningDate: "2026-03-16",
      frequency: "weekly",
      photo: null
    },
    records: structuredClone(initialRecords),
    theme: "system",
    notifications: {
      daysBefore: 1,
      missingPaycheck: true,
      backupReminder: true,
      lastBackup: null
    }
  };
}

export function loadState(){
  try{
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if(!saved) return defaultState();

    const merged = defaultState();
    merged.profile = {...merged.profile, ...(saved.profile || {})};
    merged.records = Array.isArray(saved.records)
      ? saved.records.map(record => ({
          ...record,
          periodStart: record.periodStart || shiftedDate(record.payDate, -11),
          periodEnd: record.periodEnd || shiftedDate(record.payDate, -5)
        }))
      : merged.records;
    merged.theme = saved.theme || merged.theme;
    merged.notifications = {...merged.notifications, ...(saved.notifications || {})};
    return merged;
  }catch{
    return defaultState();
  }
}

export function saveState(state){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function openPdfDatabase(){
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(PDF_DB, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if(!db.objectStoreNames.contains(PDF_STORE)){
        db.createObjectStore(PDF_STORE, {keyPath: "id"});
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getAllPdfs(){
  const db = await openPdfDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction(PDF_STORE).objectStore(PDF_STORE).getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function savePdf(document){
  const db = await openPdfDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PDF_STORE, "readwrite");
    tx.objectStore(PDF_STORE).put(document);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

export async function removePdf(id){
  const db = await openPdfDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PDF_STORE, "readwrite");
    tx.objectStore(PDF_STORE).delete(id);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

export async function clearPdfs(){
  const db = await openPdfDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PDF_STORE, "readwrite");
    tx.objectStore(PDF_STORE).clear();
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}
