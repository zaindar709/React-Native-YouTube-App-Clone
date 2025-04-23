// firebaseConfig
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAldTqZIIbur6z3gI6tc4lFW4Q0ZQf3fTY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  projectId: 'you-tube-player-4609b',
  storageBucket: 'you-tube-player-4609b.firebasestorage.app',
  messagingSenderId: '1012947154876',
  appId: '1:1012947154876:android:a0ff52aca11ddc93671db9',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
