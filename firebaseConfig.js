import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth'; // Import other services as needed

const firebaseConfig = {
  apiKey: "AIzaSyBS6PurdFW1VzJRSTIR9-N00w0O-hQGOR0",  // New API key
  projectId: "ecommerce-app-de70d",  // New project ID
  storageBucket: "ecommerce-app-de70d.firebasestorage.app",  // New storage bucket
  messagingSenderId: "153738083089",  // New messaging sender ID
  appId: "1:153738083089:android:41b9f97634ee85b6a1eab0",  // New app ID
  databaseURL: "",  // Optional if you're not using Realtime Database
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  console.log('Firebase already initialized!');
}

export default firebase;
