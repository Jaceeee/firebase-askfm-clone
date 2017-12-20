
function submit() {
  let database = firebase.database();
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
  renderData();
}

function renderData() {
  var dataset = [];
  var dbRef = firebase.database().ref().child('users');
  dbRef.on('value', snap => {
    let result = "";
    let users = snap.val();
    for (let p in users) {
      if(users.hasOwnProperty(p)) {
        result += users[p].email + "," + users[p].name + "," + users[p].username + '\n';
        dataset.push([users[p].name, users[p].username, users[p].email]);
      }
    }

    $(document).ready(function() {
      table = $('#users').DataTable( {
        data: dataset,
        columns: [
          {title: "Name"},
          {title: "Username"},
          {title: "Email"}
        ],
        retrieve: true
      });

      table.destroy();
    });

  });
}
