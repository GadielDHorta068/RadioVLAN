const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

module.exports = pool;
//creo que este archivo no se usa ya, quedo en la maqueta