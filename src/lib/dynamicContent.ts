import { doc, getDoc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from './firebase';

export async function getSiteContent() {
  try {
    const snap = await getDoc(doc(db, 'sections', 'content'));
    if (snap.exists()) {
      return snap.data();
    }
  } catch (error) {
    console.error("Error fetching dynamic content:", error);
  }
  return null;
}

export async function getGlobalSettings() {
  try {
    const snap = await getDoc(doc(db, 'settings', 'global'));
    if (snap.exists()) {
      return snap.data();
    }
  } catch (error) {
    console.error("Error fetching settings:", error);
  }
  return null;
}

export async function getServices() {
  try {
    const q = query(collection(db, 'services'), orderBy('order', 'asc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function getProducts() {
  try {
    const q = query(collection(db, 'products'), orderBy('order', 'asc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
