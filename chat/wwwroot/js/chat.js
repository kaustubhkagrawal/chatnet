"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var user = "user" + Math.floor(Math.random() * 100);;
var group = null;


//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;
document.getElementById("userInput").value = user;

connection.on("ReceiveMessage", function (message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.on("Notification", function (message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = msg;
    var li = document.createElement("li");
    li.style.color = "green";
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});


document.getElementById("joingroupbtn").addEventListener("click", function (event) {
    group = document.getElementById("groupInput").value;
    user = document.getElementById("userInput").value;
    connection.invoke("JoinGroup", group, user);
    document.getElementById("joinGroup").style.display = 'none';
    document.getElementById("msgInput").style.display = 'block';
});

document.getElementById("sendButton").addEventListener("click", function (event) {

    event.preventDefault();
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message, group).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});