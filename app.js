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

var users = 0;

io.on("connection", function (sockets) {
  console.log("A user connected");
  users++;
  //   emit ke baad event ka name dete han jo ki fix nhi hai kuch bhi meaning ful ho skta hai
  io.sockets.emit("broadcast", { message: "users connected", users });

  //   sockets.on("myCustomEvt", (data) => console.log(data.message));

  sockets.on("disconnect", () => {
    users--;
    io.sockets.emit("broadcast", { message: users + "users disconnected" });

    console.log("A user disconnected");
  });
});

http.listen(3001, () => {
  console.log(`Server running at port: 3001`);
});
