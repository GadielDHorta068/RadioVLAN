const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

/**
 * Configuración del servidor de gestión de estaciones de radio
 *
 * @module ServidorRadio
 * @description API RESTful para administrar una base de datos de radios
 * Utiliza SQLite como base de datos y Express para el enrutamiento
 */
const app = express();

// Habilitar CORS y análisis de cuerpo JSON
app.use(cors());
app.use(express.json());

/**
 * Conexión a la Base de Datos
 * Establece conexión con base de datos SQLite en la raíz del proyecto
 *
 * @type {sqlite3.Database}
 * @throws {Error} Registra errores de conexión en la consola
 */
const db = new sqlite3.Database("./database.sqlite", (err) => {
    if (err) {
        console.error("Error al conectar a SQLite:", err.message);
    } else {
        console.log("Conectado a SQLite.");
    }
});

/**
 * Inicialización de la Tabla de Base de Datos
 * Crea la tabla 'radios' si no existe
 *
 * Esquema de la Tabla:
 * - id: Identificador único (Clave primaria auto-incrementable)
 * - name: Nombre de la estación de radio (Obligatorio)
 * - stream_url: URL de transmisión (Obligatorio)
 * - genre: Género opcional
 * - country: País de origen opcional
 */
db.run(`
    CREATE TABLE IF NOT EXISTS radios (
                                          id INTEGER PRIMARY KEY AUTOINCREMENT,
                                          name TEXT NOT NULL,
                                          stream_url TEXT NOT NULL,
                                          genre TEXT,
                                          country TEXT
    )
`, (err) => {
    if (err) {
        console.error("Error al crear la tabla:", err.message);
    }
});

/**
 * Endpoint GET: Obtener Todas las Estaciones de Radio
 *
 * @route /radios
 * @method GET
 * @returns {Array} Lista de todas las estaciones de radio en la base de datos
 * @throws {500} Error de servidor si la consulta falla
 */
app.get("/radios", (req, res) => {
    db.all("SELECT * FROM radios", [], (err, rows) => {
        if (err) {
            console.error("Error al obtener las radios:", err.message);
            res.status(500).json({ error: "Error al obtener las radios" });
        } else {
            res.json(rows);
        }
    });
});

/**
 * Endpoint POST: Agregar Nueva Estación de Radio
 *
 * @route /add-radio
 * @method POST
 * @param {Object} request.body
 * @param {string} request.body.name - Nombre de la estación (Requerido)
 * @param {string} request.body.stream_url - URL de transmisión (Requerido)
 * @param {string} [request.body.genre] - Género opcional
 * @param {string} [request.body.country] - País opcional
 * @returns {Object} Mensaje de confirmación e ID de la nueva radio
 * @throws {400} Error de validación si falta nombre o URL
 * @throws {500} Error de servidor si falla la inserción
 */
app.post("/add-radio", (req, res) => {
    const { name, stream_url, genre, country } = req.body;

    if (!name || !stream_url) {
        return res.status(400).json({ error: "El nombre y la URL de streaming son obligatorios." });
    }

    db.run(
        `INSERT INTO radios (name, stream_url, genre, country) VALUES (?, ?, ?, ?)`,
        [name, stream_url, genre, country],
        function (err) {
            if (err) {
                console.error("Error al agregar la radio:", err.message);
                res.status(500).json({ error: "Error al agregar la radio." });
            } else {
                res.json({ message: "Radio agregada correctamente.", id: this.lastID });
            }
        }
    );
});

/**
 * Endpoint DELETE: Eliminar una Estación de Radio
 *
 * @route /delete-radio/:id
 * @method DELETE
 * @param {number} request.params.id - Identificador único de la radio a eliminar
 * @returns {Object} Mensaje de confirmación
 * @throws {404} No encontrado si no hay radio con el ID
 * @throws {500} Error de servidor si falla la eliminación
 */
app.delete("/delete-radio/:id", (req, res) => {
    const id = req.params.id;

    db.run(`DELETE FROM radios WHERE id = ?`, [id], function (err) {
        if (err) {
            console.error("Error al eliminar la radio:", err.message);
            res.status(500).json({ error: "Error al eliminar la radio." });
        } else if (this.changes === 0) {
            res.status(404).json({ error: "Radio no encontrada." });
        } else {
            res.json({ message: "Radio eliminada correctamente." });
        }
    });
});

/**
 * Endpoint PUT: Actualizar Información de Estación de Radio
 *
 * @route /update-radio/:id
 * @method PUT
 * @param {number} request.params.id - Identificador único de la radio a actualizar
 * @param {Object} request.body - Detalles actualizados de la estación
 * @param {string} [request.body.name] - Nombre actualizado
 * @param {string} [request.body.stream_url] - URL de transmisión actualizada
 * @param {string} [request.body.genre] - Género actualizado
 * @param {string} [request.body.country] - País actualizado
 * @returns {Object} Mensaje de confirmación
 * @throws {404} No encontrado si no hay radio con el ID
 * @throws {500} Error de servidor si falla la actualización
 */
app.put("/update-radio/:id", (req, res) => {
    const id = req.params.id;
    const { name, stream_url, genre, country } = req.body;

    db.run(
        `UPDATE radios SET name = ?, stream_url = ?, genre = ?, country = ? WHERE id = ?`,
        [name, stream_url, genre, country, id],
        function (err) {
            if (err) {
                console.error("Error al actualizar la radio:", err.message);
                res.status(500).json({ error: "Error al actualizar la radio." });
            } else if (this.changes === 0) {
                res.status(404).json({ error: "Radio no encontrada." });
            } else {
                res.json({ message: "Radio actualizada correctamente." });
            }
        }
    );
});

// Configuración del servidor
const PORT = process.env.PORT || 3001;

/**
 * Iniciar el servidor Express
 * Escucha en un puerto especificado, por defecto 3001 si no está configurado en el entorno
 */
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));