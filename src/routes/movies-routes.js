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
    handler: MovieController.getMovie,
  },
  createMovie: {
    method: "POST",
    url: "/movies",
    preHandler: [validateRequest],
    handler: MovieController.create,
  },
};
