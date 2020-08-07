import firebase from 'firebase'
import 'firebase/database'
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBpbHEu5NYBvBMQevtl9LJbsvAOJYFXH80",
    authDomain: "speak-cae21.firebaseapp.com",
    databaseURL: "https://speak-cae21.firebaseio.com",
    projectId: "speak-cae21",
    storageBucket: "speak-cae21.appspot.com",
    messagingSenderId: "228675175827",
    appId: "1:228675175827:web:b73b6945d4c2a2d79f9466"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export default firebaseApp;