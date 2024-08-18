import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
        apiKey: "AIzaSyARiU0_CMMoD70zzez8FTjHnfD9sGXdXX4",
        authDomain: "seccion16react02.firebaseapp.com",
        projectId: "seccion16react02",
        storageBucket: "seccion16react02.appspot.com",
        messagingSenderId: "528279600386",
        appId: "1:528279600386:web:2f8ce9a9787e410db0561b",
        measurementId: "G-1HVSPGTG72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth}