
var firebaseConfig = {
      apiKey: "AIzaSyAvw8ga4H2gbUUVFfvxIaOpdKde31BHJq0",
      authDomain: "kwitter--web-app.firebaseapp.com",
      databaseURL: "https://kwitter--web-app-default-rtdb.firebaseio.com",
      projectId: "kwitter--web-app",
      storageBucket: "kwitter--web-app.appspot.com",
      messagingSenderId: "140618419729",
      appId: "1:140618419729:web:bec01778959c2677782bb0"
    };
    firebase.initializeApp(firebaseConfig);
    
    user_name=localStorage.getItem("user name");
    document.getElementById("username").innerHTML="WELCOME " +user_name+"!";

function add_room(){
roomofchat=document.getElementById("room_name").value;

firebase.database().ref("/").child(roomofchat).update({
      purpose :"adding_room_name"
});

localStorage.setItem("room name",roomofchat);
window.location="kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value',  function(snapshot) {
            document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("room name-"+  Room_names);
     row="<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+Room_names +"</div> <hr>";
     document.getElementById("output").innerHTML+=row;
      });});}
getData();
 
function redirectToRoomName(name){
console.log(name);
localStorage.setItem("room name",name);
window.location="kwitter_page.html";
}

function log_out(){
      localStorage.removeItem("user name");
      localStorage.removeItem("room name");
      window.location.replace("index.html")

}
