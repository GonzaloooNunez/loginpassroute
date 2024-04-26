// Snippets de código para poder componer el programa

//Usado?: X
const middlewares = require("./middlewares");
//--- Explicación:
// al app.js para obtener los middlewares
// -------------------------------------------------------------------------------------

//Usado?: x
const bodyParser = require("body-parser");
//--- Explicación:
// al app.js para obtener los middlewares
// -------------------------------------------------------------------------------------

//Usado?: x
const session = require("express-session");
//--- Explicación:
// al app.js para obtener los middlewares
// -------------------------------------------------------------------------------------

//Usado?: X
const express = require("express");
//--- Explicación:
// al app.js para obtener los middlewares
// -------------------------------------------------------------------------------------

//Usado?: X
const bodyParser = require("body-parser");
//--- Explicación:
//exportamos a middlewares ya que hay funciones que requieren de ello
// -------------------------------------------------------------------------------------

//Usado?: X
const session = require("express-session");
//--- Explicación:
//exportamos a middlewares ya que hay funciones que requieren de ello
// -------------------------------------------------------------------------------------

//Usado?:X
const dotenv = require("dotenv");
//--- Explicación:
// al app.js para obtener los middlewares
// -------------------------------------------------------------------------------------

//Usado?: X
const middlewares = require("./middlewares");
//--- Explicación:
// Va en routes.js ya que llamamos a la funcion validarPalabraMiddleware para validar la clave de acceso
// -------------------------------------------------------------------------------------

//Usado?:X
const routes = require("./routes");
//--- Explicación:
// al app.js para obtener los middlewares
// -------------------------------------------------------------------------------------

//Usado?: X
dotenv.config();
//--- Explicación:
// 'dotenv' es una biblioteca usada para variables de entorno, asique la llamamos en app.js con el const dotenv = require("dotenv");
// -------------------------------------------------------------------------------------

//Usado?: X
const app = express();
//--- Explicación:
// al app.js para poder trabajar con la app de express
// -------------------------------------------------------------------------------------

//Usado?: X
const PORT = 4000;
//--- Explicación:
// al app.js para acompañar al server.listen (al puerto)
// -------------------------------------------------------------------------------------

//Usado?: X
const dotenv = require("dotenv");
//--- Explicación:
// exportamos a middlewares ya que hay funciones que requieren de ello
// -------------------------------------------------------------------------------------

//Usado?: X
dotenv.config();
//--- Explicación:
//la llamamos en middlewares.js con el const dotenv = require("dotenv");
// -------------------------------------------------------------------------------------

//Usado?: X
middlewares.setupApp(app);
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: X
routes.setup(app);
//--- Explicación:
// función para llamar a las rutas
// -------------------------------------------------------------------------------------

//Usado?: X
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || "";

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect("/?error=1");
  }
};
//--- Explicación:
// va a middlewares.js ya que es la funcion para validar si la palabra secreta es correcta y continuar o sacar "/?error=1"
// -------------------------------------------------------------------------------------

//Usado?: X
const setup = (app) => {
  app.get("/", (req, res) => {
    const mensajeError = req.query.error
      ? req.query.error === "1"
        ? "Palabra incorrecta, inténtalo de nuevo."
        : "No estás logado."
      : "";
    if (req.session.palabraSecreta) {
      return res.redirect("/profile");
    }
    //Aquí va código dentro
  });
};
//--- Explicación:
// Va en routes.js ya que es la página principal, la primera ruta a la que queremos acceder
// -------------------------------------------------------------------------------------

//Usado?: X
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación:
// Esto va dentro de la condicional del const setup, ya que es la respuesta que queremos si no aciertas la palabra secreta
// -------------------------------------------------------------------------------------

//Usado?: X
const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    session({
      secret: "secretoSuperSecreto",
      resave: false,
      saveUninitialized: true,
    })
  );
};
//--- Explicación:
// Va a middlewares.js ya que bodyParser.urlencoded es un middleware que esta configurado para poder leer los datos del formulario y el session esta configurado para proteger estos datos
// -------------------------------------------------------------------------------------

//Usado?: X
app.post("/profile", middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación:
// Va en routes.js ya que es la ruta que nos lleva al POST del perfil del usuario y se accede a ella cuando pones la palabra secreta
// -------------------------------------------------------------------------------------

//Usado?: REPETIDO ???????????
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: REPETIDO ???????????
app.use(
  session({
    secret: process.env.PALABRA_SECRETA || "secretoSuperSecreto",
    resave: false,
    saveUninitialized: true,
  })
);

//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: X
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación:
// Al app.js ya que el app.listen es el que inicializa el srvidor en este puerto (4000)
// -------------------------------------------------------------------------------------

//Usado?: X
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect("/?error=2");
  }
};
//--- Explicación:
//middleware  para que si alguien intenta acceder al perfil del usuario sin poner la palabra secreta salte "/?error=2"
// -------------------------------------------------------------------------------------

//Usado?: X
app.get("/profile", middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación:
// // Va en routes.js ya que es la ruta que nos lleva al GET del perfil del usuario y se accede a ella cuando pones la palabra secreta
// -------------------------------------------------------------------------------------

//Usado?: X
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
    }
    res.redirect("/");
  });
});
//--- Explicación:
// A routes.js y es la ruta que nos redirecciona a la pagina de inicio al cerrar sesion
// -------------------------------------------------------------------------------------

//Usado?: X
module.exports = {
  setup,
};
//--- Explicación:
// Exportamos las rutas
// -------------------------------------------------------------------------------------

//Usado?: X
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación:
// Exportamos los middlewares
// -------------------------------------------------------------------------------------
