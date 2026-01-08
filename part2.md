# Broadcasting

- User can see how many user are connected.

```js

<body>
    <p>Hello world</p>

    <script>
        const socket = io("http://localhost:3001");
        socket.on('broadcast',(data)=>{
            document.body.innerHTML = '';
            document.writeln(data.message)
        })
</script>
</body>

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


```

- If user connect then we will show a welcome message to user and other users can see how many users connected.

```html
<body>
  <p>Hello world</p>

  <script>
    const socket = io("http://localhost:3001");
    socket.on("newUserconnect", (data) => {
      document.body.innerHTML = "";
      document.writeln(data.message);
    });
    socket.on("messagetoall", (data) => {
      // document.body.innerHTML = '';
      document.writeln(data.message);
    });
  </script>
</body>
```

```js
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
```
