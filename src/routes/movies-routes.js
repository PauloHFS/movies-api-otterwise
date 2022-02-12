import * as MovieController from "../controllers/movie-controller.js";
import { validateRequest } from "../middleware/auth.js";

export default {
  showAllMovies: {
    method: "GET",
    url: "/movies",
    handler: MovieController.index,
  },
  showMovie: {
    method: "GET",
    url: "/movies/:id",
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
      },
    },
    handler: MovieController.getMovie,
  },
  createMovie: {
    method: "POST",
    url: "/movies",
    schema: {
      header: {
        type: "object",
        properties: {
          Authorization: { type: "string" },
        },
        required: ["Authorization"],
      },
      body: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          gender_id: { type: "number" },
        },
        required: ["title", "description", "gender_id"],
      },
    },
    preHandler: [validateRequest],
    handler: MovieController.create,
  },
  deleteMovie: {
    method: "DELETE",
    url: "/movies/:id",
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
      },
    },
    preHandler: [validateRequest],
    handler: MovieController.remove,
  },
};
