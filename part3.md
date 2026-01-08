### Namespace

- What is name space in Socket.Io?

ye basically endpoint hota hai ki multiple connection bnane ke kaam aata hai and alag alag chat use kr skte han

multiple chats a time.

- How to create or use Namespace ?

socket io me default connection hota hai '/'
to crate custom namespace then i will use

```js
let cnsp = io.of("/custom-namespace");

cnsp.on;
```

code

```html
<body>
  <p>Hello world</p>

  <script>
    const socket = io("http://localhost:3001/custom-namespace");
    socket.on("customEvent", (data) => {
      document.body.innerHTML = "";
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

// this is my custom event
// we can create multiple chats connecton throgh this
let cnsp = io.of("/custom-namespace");
let cnsp1 = io.of("/custom-namespace");

cnsp.on("connection", function (socket) {
  console.log("A user connected");

  cnsp.emit("customEvent", { message: "Tester event call" });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

http.listen(3001, () => {
  console.log(`Server running at port: 3001`);
});
```

### rooms

- What is rooms ?

rooms basically hr ek namespace ke and multiple rooms channel define kr skte hai and by the help of sockets we can join or leave them.

- Why we use rooms

rooms are used for group chats

Ex1 : Create a simple Room.

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

// creating rooms

// let cnsp = io.of("/custom-namespace");
// let cnsp1 = io.of("/custom-namespace");

var room = 1;

io.on("connection", function (socket) {
  console.log("A user connected");

  // creating channel / rom
  socket.join("room-" + room);

  io.sockets
    .in("room-" + room)
    .emit("connectedRoom", "You are connected to room no : " + room);

  // cnsp.emit("customEvent", { message: "Tester event call" });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

http.listen(3001, () => {
  console.log(`Server running at port: 3001`);
});
```

```html
<body>
  <p>Hello world</p>

  <script>
    const socket = io("http://localhost:3001/");
    socket.on("connectedRoom", (data) => {
      document.body.innerHTML = "";
      document.writeln(data);
    });
  </script>
</body>
```

Ex2 : How to create multiple rooms with their limits.

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
```

```html
<body>
  <p>Hello world</p>

  <script>
    const socket = io("http://localhost:3001/");
    socket.on("connectedRoom", (data) => {
      document.body.innerHTML = "";
      document.writeln(data);
    });
  </script>
</body>
```

### error handing in socket.io

- why we need error handling ?


- what are the events for error handling ? 

