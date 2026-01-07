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

io.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("myCustomEvt", (data) => console.log(data.message));

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

http.listen(3001, () => {
  console.log(`Server running at port: 3001`);
});
