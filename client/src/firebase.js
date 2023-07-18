import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDuXwW1wW9XRJ76ehAPLL_2g9MHQ0TWXIk",
    authDomain: "food-ecommerce-f8f60.firebaseapp.com",
    databaseURL: "https://food-ecommerce-f8f60-default-rtdb.firebaseio.com",
    projectId: "food-ecommerce-f8f60",
    storageBucket: "food-ecommerce-f8f60.appspot.com",
    messagingSenderId: "368353446689",
    appId: "1:368353446689:web:2d7bee116bdbd332518c60"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


