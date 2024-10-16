require("dotenv").config();

const express = require("express");
var cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const PORT = 3000;

app.use(cors());

const SECRET_KEY = "clave_secreta";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor corriendo. Puedes probar las rutas /signup y /login.");
});

// Rutas de API
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // Normalizar el email
  const normalizedEmail = email.toLowerCase();

  // Verificar si el correo electrónico ya está en uso
  const checkQuery = `SELECT * FROM users WHERE email = ?`;
  db.get(checkQuery, [normalizedEmail], (err, row) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error en la base de datos", error: err.message });
    }
    if (row) {
      // Si ya existe un usuario con ese correo
      return res
        .status(400)
        .json({ message: "Ya existe una cuenta con ese email." });
    }

    // Insertar el nuevo usuario
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.run(query, [name, normalizedEmail, password], function (err) {
      if (err) {
        return res.status(400).json({
          message: "Error al registrar el usuario",
          error: err.message,
        });
      }
      res
        .status(201)
        .json({ message: "Usuario registrado con éxito", userId: this.lastID });
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  db.get(query, [email, password], (err, row) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al iniciar sesión", error: err.message });
    }
    if (!row) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Generar un token
    const token = jwt.sign({ userId: row.id }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "Inicio de sesión exitoso", user: row, token });
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//SQLite
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("../database/users.db", (err) => {
  if (err) {
    console.error("Error al abrir la base de datos", err.message);
  } else {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )`);
  }
});
