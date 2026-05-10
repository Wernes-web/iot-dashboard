const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
    host: "postgres",
    user: "postgres",
    password: "password123",
    database: "sensordb",
    port: 5432
});

app.get("/", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM moisture_data ORDER BY id DESC LIMIT 20"
        );

        let html = `
            <h1>Sensor Dashboard</h1>
            <table border="1" cellpadding="10">
                <tr>
                    <th>ID</th>
                    <th>Timestamp</th>
                    <th>Moisture</th>
                </tr>
        `;

        result.rows.forEach(row => {

            html += `
                <tr>
                    <td>${row.id}</td>
                    <td>${row.timestamp}</td>
                    <td>${row.moisture}</td>
                </tr>
            `;
        });

        html += "</table>";

        res.send(html);

    } catch (err) {

        console.error(err);
        res.status(500).send("Database error");
    }
});

app.listen(3000, () => {
    console.log("Dashboard running on port 3000");
});