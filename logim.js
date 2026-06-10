const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const axios = require("axios");

let spotifyAccessToken = "";
const app = express();

app.use(cors());
app.use(express.json());

const clientId = "b58ad8e043b74d33a4451b8440978c4f";
const clientSecret = "e798c5d1bab34814b17087f20e00218a";

const redirectUri =
    "http://127.0.0.1:3001/spotify/callback";

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

// LOGIN SPOTIFY
app.get("/spotify/login", (req, res) => {

    const scopes = [
        "user-read-private",
        "user-read-email",
        "user-read-playback-state",
        "user-modify-playback-state",
        "streaming"
    ].join(" ");

    const authUrl =
        `https://accounts.spotify.com/authorize` +
        `?response_type=code` +
        `&client_id=${clientId}` +
        `&scope=${encodeURIComponent(scopes)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}`;

    console.log(authUrl);

    res.redirect(authUrl);

});

// CALLBACK SPOTIFY
app.get("/spotify/callback", async (req, res) => {

    const code = req.query.code;

    if (!code) {

        return res.send("No se recibió código de Spotify");

    }

    try {

        const response = await axios.post(

            "https://accounts.spotify.com/api/token",

            new URLSearchParams({

                grant_type: "authorization_code",
                code: code,
                redirect_uri: redirectUri

            }),

            {

                headers: {

                    Authorization:
                        "Basic " +
                        Buffer.from(
                            clientId + ":" + clientSecret
                        ).toString("base64"),

                    "Content-Type":
                        "application/x-www-form-urlencoded"

                }

            }

        );

        const accessToken =
            response.data.access_token;
            
        spotifyAccessToken = accessToken;    
        console.log("TOKEN GUARDADO:", spotifyAccessToken);

        const refreshToken =
            response.data.refresh_token;

        console.log("ACCESS TOKEN:");
        console.log(accessToken);

        console.log("REFRESH TOKEN:");
        console.log(refreshToken);

       res.send(`
<h1>SPOTIFY CONECTADO</h1>
<p>Login exitoso</p>
`);

    } catch (error) {

        console.error(
            error.response?.data || error.message
        );

        res.send(`
            <h1>Error al conectar Spotify</h1>
            <pre>
${JSON.stringify(
    error.response?.data || error.message,
    null,
    2
)}
            </pre>
        `);

    }

});



// PLAY / PAUSE SPOTIFY
app.put("/spotify/playpause", async (req, res) => {

    try {

        const estado = await axios.get(
            "https://api.spotify.com/v1/me/player",
            {
                headers: {
                    Authorization: `Bearer ${spotifyAccessToken}`
                }
            }
        );

        const reproduciendo = estado.data.is_playing;

        if (reproduciendo) {

            await axios.put(
                "https://api.spotify.com/v1/me/player/pause",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${spotifyAccessToken}`
                    }
                }
            );

            res.json({
                estado: "pause"
            });

        } else {

            await axios.put(
                "https://api.spotify.com/v1/me/player/play",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${spotifyAccessToken}`
                    }
                }
            );

            res.json({
                estado: "play"
            });

        }

    } catch (error) {

        console.error(
            error.response?.data || error.message
        );

        res.status(500).json({
            error: "Error Spotify"
        });

    }

});



// SERVIDOR
app.listen(3001, () => {

    console.log("Servidor corriendo en puerto 3001");

});