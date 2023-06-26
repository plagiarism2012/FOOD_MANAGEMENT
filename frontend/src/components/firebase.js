import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC7wXKGfy3ot9H7wPESNT25O4ODHJKyLCw",
  authDomain: "kstproject-d9ead.firebaseapp.com",
  projectId: "kstproject-d9ead",
  storageBucket: "kstproject-d9ead.appspot.com",
  messagingSenderId: "494767136153",
  appId: "1:494767136153:web:6daf84e1ad1f0eed010708",
  measurementId: "G-5SX1ELG64N"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);