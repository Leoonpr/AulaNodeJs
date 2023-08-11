const AppError = require("../utils/AppError");

class usersController {
  create(request, response) {
    const { name, email, password } = request.body;
    // response.send
    if (!name) {
      throw new AppError("O nome é obrigatório");
    }
    response
      .status(201)
      .json(`Usuário: ${name} - Email: ${email} - Password: ${password}`);
  }

  /*
  index - get - para listar todos os registros
  show - get - exibe um registro especifico
  create - post - criar um registro
  update - put - para atualizar um registro
  delete - delete - para deletar um registro
  */
}

module.exports = usersController;
