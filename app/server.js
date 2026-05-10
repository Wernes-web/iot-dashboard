const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const sensorRoutes = require("./routes/sensors");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));
app.use("/api", sensorRoutes);

io.on("connection", (socket) => {
    console.log("Client connected");
});

server.listen(3000, () => {
    console.log("Dashboard running on port 3000");
});