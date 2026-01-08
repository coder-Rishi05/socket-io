### Namespace

- What is name space in Socket.Io?

ye basically endpoint hota hai ki multiple connection bnane ke kaam aata hai and alag alag chat use kr skte han

multiple chats a time.

- How to create or use Namespace ?

socket io me default connection hota hai '/'
to crate custom namespace then i will use 

```js

let cnsp = io.of('/custom-namespace')

cnsp.on
```

code

```html


<body>
    <p>Hello world</p>

    <script>
        const socket = io("http://localhost:3001/custom-namespace");
        socket.on('customEvent', (data) => {
            document.body.innerHTML = '';
            document.writeln(data.message)
        })

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
- Why we use rooms