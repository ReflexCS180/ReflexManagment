// src/firebase.js
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyBWxTzBZhGrOE91WnDrl0qDCVA2ZsfsAwA",
    authDomain: "reflexdb-e2043.firebaseapp.com",
    databaseURL: "https://reflexdb-e2043.firebaseio.com",
    projectId: "reflexdb-e2043",
    storageBucket: "reflexdb-e2043.appspot.com",
    messagingSenderId: "272765909069"
};

firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;

