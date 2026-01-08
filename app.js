const express = require("express");

const app = express();

var http = require("http").Server(app);

var io = require("socket.io")(http);

let path = require("path");

app.get("/", (req, res) => {
  var option = {
    root: path.join(__dirname),
  };

  var filename = "index.html";
  res.sendFile(filename, option);
});

// creating rooms

// let cnsp = io.of("/custom-namespace");
// let cnsp1 = io.of("/custom-namespace");

var room = 1;
var full = 0;

io.on("connection", function (socket) {
  console.log("A user connected");

  // creating channel / rom
  socket.join("room-" + room);

  io.sockets
    .in("room-" + room)
    .emit("connectedRoom", "You are connected to room no : " + room);

  full++;
  if (full >= 2) {
    full = 0;
    room++;
  }

  // cnsp.emit("customEvent", { message: "Tester event call" });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

http.listen(3001, () => {
  console.log(`Server running at port: 3001`);
});
