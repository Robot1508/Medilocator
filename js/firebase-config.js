// Firebase configuration settings for MediLocator project
// Replace the placeholders with your actual Firebase project settings
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore (or Realtime Database if preferred)
const db = firebase.firestore(); // For Firestore
// const db = firebase.database(); // For Realtime Database (uncomment if using)

// Export the database for use in other modules
export { db };