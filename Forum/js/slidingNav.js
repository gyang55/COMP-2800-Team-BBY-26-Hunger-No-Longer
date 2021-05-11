'use strict'

//When you invoke this method, it will set a width to reveal side bar:
function openNav() {
    event.stopPropagation();
    document.getElementById("mySidenavContainer").style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.7)";
  }
  
//When you invoke this method, it will set a width=0 to close side bar:
function closeNav() {
    //Never use .onclick, but rather .addEventListener
    document.querySelector('#outerContainer').addEventListener('click', closeNav);
    document.getElementById("mySidenavContainer").style.width = "0";
    document.body.style.backgroundColor = "white";
}

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyC8itX2z0wUApUIla9nnjdveSJZefzkhPg",
    authDomain: "hunger-no-longer.firebaseapp.com",
    projectId: "hunger-no-longer",
    storageBucket: "hunger-no-longer.appspot.com",
    messagingSenderId: "175325108135",
    appId: "1:175325108135:web:a04f1b193f2636ee7c0882",
    measurementId: "G-7345YYM9FN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>