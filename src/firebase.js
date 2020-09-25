import firebase from "firebase/app";
import firestore from "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDGkslh82oBH3C-ltXYCcpnzRCK2TPHPIA",
    authDomain: "vuetify-antbear.firebaseapp.com",
    databaseURL: "https://vuetify-antbear.firebaseio.com",
    projectId: "vuetify-antbear",
    storageBucket: "vuetify-antbear.appspot.com",
    messagingSenderId: "867316610934",
    appId: "1:867316610934:web:5f7ae568f5efd5abe22c57",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();



export { db, firebase };