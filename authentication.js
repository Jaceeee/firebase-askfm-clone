
function signUp () {
  successfulCreate = true;
  var database = firebase.database();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var name = document.getElementById('name').value;

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      successfulCreate = false;
      alert(errorCode+": "+errorMessage);
  }).then(() => {
    if(successfulCreate) {
      let newPostKey = database.ref().child('users').push().key;
      addUser(newPostKey, name, username, email);
    }
  });

}


function signIn () {
  var successfulSign = true;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...window.location
    successfulSign = false;
    console.error(errorCode+":"+errorMessage);
  }).then(() => {
    if(successfulSign) {
      window.location = "index.html";
      alert("Successful sign in!");
    } else {
      alert("An error happened");
    }
  });
}

function signOut () {
  successfulSignOut = true;
  firebase.auth().signOut().then(function() {
    alert("sign out successful");
  }).catch(function(error) {
    alert("An error happened:\n" + error);
    successfulSignOut = false;
  }).then(()=>{
    if(successfulSignOut) {
      window.location = 'signin.html';
    }
  });
}

function addUser(userId, name, username, email) {
  firebase.database().ref('users/' + userId).set({
    name: name,
    username: username,
    email: email
  }).then(()=>{
    window.location = "index.html"
  });
}
