import fs from 'fs';
import path from 'path';

export interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  industry: string;
  referral: string;
  dietary: string[];
  requirements: string;
  isFundraising: boolean;
  investmentStage: string;
  helpNeeded: string;
  createdAt: string;
  paymentStatus: 'pending' | 'completed';
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'registrations.json');

// Ensure database file and directory exist
function initDb() {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Failed to initialize database file:', err);
  }
}

export function getRegistrations(): Registration[] {
  initDb();
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data) as Registration[];
  } catch (err) {
    console.error('Failed to read database file:', err);
    return [];
  }
}

export function saveRegistration(registration: Omit<Registration, 'id' | 'createdAt' | 'paymentStatus'>): Registration {
  initDb();
  const db = getRegistrations();
  
  const newRegistration: Registration = {
    ...registration,
    id: `reg_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
    paymentStatus: 'pending',
  };

  db.push(newRegistration);
  
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    return newRegistration;
  } catch (err) {
    console.error('Failed to save to database file:', err);
    throw new Error('Database write failure');
  }
}

export function completePayment(id: string): Registration | null {
  initDb();
  const db = getRegistrations();
  const index = db.findIndex(r => r.id === id);
  if (index === -1) return null;

  db[index] = {
    ...db[index],
    paymentStatus: 'completed',
  };

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
    return db[index];
  } catch (err) {
    console.error('Failed to update database file:', err);
    throw new Error('Database write failure');
  }
}
