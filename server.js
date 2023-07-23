require("dotenv");
const express = require("express");

const PORT = process.env.PORT | 4000;
const app = express();
const http = require("http").createServer(app);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// socket
const io = require("socket.io")(http);
io.on("connection", (socket) => {
  console.log("Connected....");

  socket.on("messageSend", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});

http.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
