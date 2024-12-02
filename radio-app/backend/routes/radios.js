const express = require("express");
const router = express.Router();
const pool = require("../database");

// Ruta para obtener todas las estaciones de radio
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM radios");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las radios" });
    }
});

module.exports = router;
