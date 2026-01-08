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

io.on("connection", function (socket) {
  console.log("A user connected");
  users++;
  //   emit ke baad event ka name dete han jo ki fix nhi hai kuch bhi meaning ful ho skta hai
  // ye new users ko message krega
  socket.emit("newUserconnect", { message: "Welcome new user" });

  //   socket.on("myCustomEvt", (data) => console.log(data.message));

  // ye sirf connected users ko message dega
  socket.broadcast.emit("newUserconnect", { message: users + "connected" });
  io.sockets.emit("messagetoall", { message: "hello everone " });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
    users--;
    // ye io.sockets sbhi users ko message dega.
    socket.broadcast.emit("newUserconnect", {
      message: users + "users connected",
    });
  });
});

http.listen(3001, () => {
  console.log(`Server running at port: 3001`);
});
