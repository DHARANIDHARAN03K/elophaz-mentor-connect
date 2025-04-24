
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration is already in index.html
// This just gets the initialized instance
const app = initializeApp((window as any).firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
