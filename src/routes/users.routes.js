const { Router } = require("express");
const UsersController = require("../controllers/usersControllers");
const usersController = new UsersController();
const userRoutes = Router();

function myMiddleware(request, response, next) {
  console.log("Voce passou pelo middleware");
  if (!request.body.isAdmin) {
    return response.json({ message: "user unauthorized" });
  }

  next();
}

userRoutes.post("/", myMiddleware, usersController.create);

module.exports = userRoutes;
