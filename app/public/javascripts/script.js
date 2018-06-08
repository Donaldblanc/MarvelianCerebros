//import { PassThrough } from "stream";

(function() { 

    // initialize Firebase 
    const config = {
    apiKey: "AIzaSyDI0QzEY--AmU8EYqeBHdBWEOHauJhrCyc",
    authDomain: "marvelliancerebros2.firebaseapp.com",
    databaseURL: "https://marvelliancerebros2.firebaseio.com",
    projectId: "marvelliancerebros2",
    storageBucket: "",
    messagingSenderId: "115106650682"

    };



    firebase.initializeApp(config);

    //get elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');
    const ubtn = document.getElementById('updateName');

    // Add login Event

    btnLogin.addEventListener('click', e => {
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();

        //sign in 
       const promise = auth.signInWithEmailAndPassword(email, password);
       promise.catch(e => console.log(e.message));

    });

    ubtn.addEventListener('click', e => {
        updateDisplyName();
    })
    btnSignUp.addEventListener('click', e => { 

        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();

        //sign up
       const promise = auth.createUserWithEmailAndPassword(email, password);
       promise
       //.then(user => console.log(user))
       .catch(e => console.log(e.message));
    });

    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
    })

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
            console.log(firebaseUser);
            alert(firebaseUser.email);
            alert(firebaseUser.displayName);
            btnLogout.classList.remove('hide')


        }else{
            console.log("user not logged in");
            alert("user not logged in");
            btnLogout.classList.add('hide');
        }

    });
 function updateDisplyName(){
    var user = firebase.auth().currentUser;
    var person = prompt("Please enter your name");
    user.updateProfile({
        displayName: person
      }).then(function() {
        console.log(user);
      }).catch(function(error) {
        // An error happened.
      });

 }

}());