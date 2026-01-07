hello world program in socket io

installing the socket io

```bash

npm i express socket.io

```

connecting html to socket io

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.8.1/socket.io.js"></script>
  </head>

  <body>
    <p>Hello world</p>

    <script>
      const socket = io("http://localhost:3001");

      socket.on("connect", () => {
        console.log("Connected to server");
      });
    </script>
  </body>
</html>
```

- backend code

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

io.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

http.listen(3001, () => {
  console.log(`Server running at port: 3001`);
});
```

---

# Events in Sockt.IO

- what are events ?

- What are prereserved Events of Socket.IO

```md
### server side events

- connection : for creating connection
- disconnect : for disconnecting jb bhi koi user disconnect hoga to ye event chalega.
- message : ye event server side se client frontend ko message bhej skta hai and frontend pe use ho skta hai.
- reconnect :
- ping :
- join :
- leave :

### client side event

- connect

- connect_error

- connect_timeout

- reconnect
```

- sending message from server and catching on frontend

```html
<body>
  <p>Hello world</p>
  <script>
    const socket = io("http://localhost:3001");
    socket.on("connect", () => {
      console.log("Connected to server");
      socket.on("message", function (data) {
        document.writeln(data);
      });
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

io.on("connection", function (socket) {
  console.log("A user connected");

  setTimeout(function () {
    // ye send function socket deta hai isme kuch bhi likh ke bhej skte han and frontend pe use catch kr skte han.

    socket.send("Sent message from server side by prereserved events");
  }, 4000);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

http.listen(3001, () => {
  console.log(`Server running at port: 3001`);
});
```

- How to create a Custom Event ?

1. Custom Event create on server side and catch on client side.

```js

<body>
    <p>Hello world</p>

    <script>
        const socket = io("http://localhost:3001");

        socket.on("connect", () => {
            console.log("Connected to server");
            // event catch krne ke liye
            socket.on('message', function (data) {
                document.writeln(data)
            })

            socket.on('myCustomEvt', (data) => { document.writeln(data.message) })
        });
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

io.on("connection", function (socket) {
  console.log("A user connected");

  setTimeout(function () {
    // ye send function socket deta hai isme kuch bhi likh ke bhej skte han and frontend pe use catch kr skte han.

    socket.send("Sent message from server side by prereserved events");

    // it is used to create custom event

    socket.emit("myCustomEvt", {
      message: "my custom message from server side.",
    });
  }, 4000);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

http.listen(3001, () => {
  console.log(`Server running at port: 3001`);
});


```

2. Custom Event create on client side and catch on server side.

```js

```
