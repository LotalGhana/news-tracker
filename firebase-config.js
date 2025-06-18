// Replace with your real config:
const firebaseConfig = {
    apiKey: "AIzaSyC4z0dvUJjw1Gx7lKwSSuEmIIHXVaH9mEU",
    authDomain: "newstrackerapp-fd389.firebaseapp.com",
    projectId: "newstrackerapp-fd389",
    storageBucket: "newstrackerapp-fd389.firebasestorage.app",
    messagingSenderId: "288902214240",
    appId: "1:288902214240:web:fbfd135ee3236e0d6c8905",
    measurementId: "G-9V086ZDV6X"
};

firebase.initializeApp(firebaseConfig);

// Export Firestore and Auth (optional but helpful)
const db = firebase.firestore();
const auth = firebase.auth();