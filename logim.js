const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const axios = require("axios");

let spotifyAccessToken = "";
const app = express();

app.use(cors());
app.use(express.json());



// MYSQL
const conexion = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "DELL",
    database: "login_db"

});

conexion.connect((error) => {

    if (error) {

        console.error("Error de conexión:", error);

    } else {

        console.log("MySQL conectado");

    }

});

// REGISTRO
app.post("/registro", (req, res) => {

    const { usuario, contraseña } = req.body;

    const sql = `
        INSERT INTO registro(usuario, contraseña)
        VALUES (?, ?)
    `;

    conexion.query(sql, [usuario, contraseña], (error) => {

        if (error) {

            console.error(error);

            return res.json({
                success: false
            });

        }

        res.json({
            success: true
        });

    });

});

// LOGIN
app.post("/login", (req, res) => {

    const { usuario, contraseña } = req.body;

    const sql = `
        SELECT * FROM registro
        WHERE usuario = ? AND contraseña = ?
    `;

    conexion.query(sql, [usuario, contraseña], (error, resultados) => {

        if (error) {

            console.error(error);

            return res.json({
                success: false
            });

        }

        res.json({
            success: resultados.length > 0
        });

    });

});








// SERVIDOR
app.listen(3001, () => {

    console.log("Servidor corriendo en puerto 3001");

});