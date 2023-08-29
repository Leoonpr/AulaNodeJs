require("express-async-errors");
const database = require("./database/sqlite");

const AppError = require("./utils/AppError");

const express = require("express");

const routes = require("./routes");

const app = express();
app.use(express.json());

database();

app.use(routes);

// app.get("/message/:id/:user", (request, response) => {
//   const { id, user } = request.params;
//   response.send(`Id da mensagem: ${id}. Para o usuário ${user}`);
// });

// app.get("/users", (request, response) => {
//   const { page, limit } = request.query;

//   response.send(`Página: ${page}. Mostrar: ${limit}`);
// });

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    statusbar: "error",
    message: "Internal Server Error",
  });
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
