const knex = require("../database/knex");

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

    try {
      // Insert the note
      const [noteId] = await knex("notes").insert({
        title,
        description,
        user_id,
      });

      // Insert links with the correct note_id
      const linksInsert = links.map((link) => {
        return {
          note_id: noteId,
          url: link,
        };
      });

      await knex("links").insert(linksInsert);

      // Insert tags with the correct note_id
      const tagsInsert = tags.map((name) => {
        return {
          note_id: noteId,
          name,
          user_id,
        };
      });

      await knex("tags").insert(tagsInsert);

      response.json({ message: "Note created successfully" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: "Internal server error" });
    }
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links")
      .where({ note_id: id })
      .orderBy("created_at");

    return response.json({ ...note, tags, links });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("notes").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { user_id } = request.query;

    const notes = await knex("notes").where({ user_id }).orderBy("title");

    return response.json(notes);
  }
}

module.exports = NotesController;
