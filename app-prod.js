const express = require("express");
const path = require("path");
const routineRoutes = require("./routes/routineRoutes");
const authRoutes = require("./routes/authRoutes");
const metaRoutes = require("./routes/metaRoutes");
const agendaRoutes = require("./routes/agendaRoutes");
const diarioRoutes = require("./routes/diarioRoutes");
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("views"));

// Rutas
app.use("/auth", authRoutes);
// Rutas protegidas: requieren token Bearer (idToken)
app.use("/routines", authMiddleware, routineRoutes);
app.use('/metas', authMiddleware, metaRoutes);
app.use('/agenda', authMiddleware, agendaRoutes);
app.use('/diario', authMiddleware, diarioRoutes);

// Endpoint para servir configuración de Firebase
app.get("/firebase-config.js", (req, res) => {
  res.type('application/javascript');
  res.send(`
export const firebaseConfig = {
  apiKey: "AIzaSyDpqk1Kbfj4LSQtu4Q86aaII5PwB9YolzQ",
  authDomain: "diario-b165d.firebaseapp.com",
  databaseURL: "https://diario-b165d-default-rtdb.firebaseio.com",
  projectId: "diario-b165d",
  storageBucket: "diario-b165d.firebasestorage.app",
  messagingSenderId: "613205028234",
  appId: "1:613205028234:web:265501a11f4c0262df2c73"
};
  `);
});

// Rutas de vistas
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.get("/dashboard.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

app.get("/test", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Servidor HTTP para producción (Render requiere HTTP)
app.listen(PORT, () => {
  console.log(`✅ Servidor activo en http://localhost:${PORT}`);
});
