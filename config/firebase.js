// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import Constants from "expo-constants"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBDxWaOapX03TXYUWDrxlJ3caiApknK3o0",
    authDomain: "beekeeping-8f7e6.firebaseapp.com",
    projectId: "beekeeping-8f7e6",
    storageBucket: "beekeeping-8f7e6.appspot.com",
    messagingSenderId: "43486883566",
    appId: "1:43486883566:web:b512c45d93113b91548dff",
    measurementId: "G-SZ0PL1ERZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth();
export const database = getFirestore();
const analytics = getAnalytics(app);