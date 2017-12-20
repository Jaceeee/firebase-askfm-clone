var database = firebase.database();

function submit() {
  let username = document.getElementById('username').value;
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let newPostKey = database.ref().child('users').push().key;
  addUser(newPostKey, name, username, email);
}

function addUser(userId, name, username, email) {
  firebase.database().ref('users/' + userId).set({
    name: name,
    username: username,
    email: email
  });
  alert("works");
}
