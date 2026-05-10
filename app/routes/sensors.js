const express = require("express");
const router = express.Router();
const pool = require("../db/postgres");

router.get("/moisture", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM moisture_data ORDER BY id ASC LIMIT 50"
        );

        res.json(result.rows);

    } catch (err) {

        console.error(err);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;