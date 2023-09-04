const { Router } = require("express");

const TagsController = require("../controllers/TagsController");

const tagsRoutes = Router();

const tagsController = new TagsController();
tagsController.get("/:user_id", tagsController.index);

module.exports = tagsRoutes;
