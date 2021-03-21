var firebaseConfig = {
      apiKey: "AIzaSyAvw8ga4H2gbUUVFfvxIaOpdKde31BHJq0",
      authDomain: "kwitter--web-app.firebaseapp.com",
      databaseURL: "https://kwitter--web-app-default-rtdb.firebaseio.com",
      projectId: "kwitter--web-app",
      storageBucket: "kwitter--web-app.appspot.com",
      messagingSenderId: "140618419729",
      appId: "1:140618419729:web:bec01778959c2677782bb0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user name");
room_name = localStorage.getItem("room name");

function send() {
      msg = document.getElementById("Message").value;
      firebase.database().ref(room_name).push({
            Name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("Message").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        Names = message_data['Name'];
                        messages = message_data['message'];
                        likes = message_data['like'];

                        Name_tag = "<h4> " + Names + "<img class='user_tick' src='tick.png'></h4>";
                        message_tag = "<h4 class='message_h4'>" + messages + "</h4>";
                        likes_tag = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + likes + " onclick='updateLike(this.id)'>";
                        thumbsup = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + likes + "</span></button><hr>";
                        row = Name_tag + message_tag + likes_tag + thumbsup;
                        document.getElementById("output").innerHTML += row;
                        //End code
                  }
            });
      });
}
getData();

function updateLike(message_id) {
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
                        like: updated_likes

      });
}

function logout(){
      localStorage.removeItem("user name");
      localStorage.removeItem("room name")
      window.location.replace("index.html")
}