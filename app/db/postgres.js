const { Pool } = require("pg");

const pool = new Pool({
    host: "postgres",
    user: "postgres",
    password: "password123",
    database: "sensordb",
    port: 5432
});

module.exports = pool;