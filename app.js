const express = require("express");
const middlewares = require("./middlewares");
const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const routes = require("./routes");

const app = express();
dotenv.config();

middlewares.setupAPP(app);
routes.setup(app);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
