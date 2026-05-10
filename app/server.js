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
    setInterval(async () => {

    try {

        const result = await pool.query(
            "SELECT * FROM moisture_data ORDER BY id DESC LIMIT 1"
        );

        if (result.rows.length > 0) {

            io.emit("moisture-update", result.rows[0]);
        }

    } catch (err) {

        console.error(err);
    }

}, 5000);
});

server.listen(3000, () => {
    console.log("Dashboard running on port 3000");
});