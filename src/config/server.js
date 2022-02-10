import fastify from "fastify";
import helmet from "fastify-helmet";
import cors from "fastify-cors";

import routes from "../routes/routes.js";

const app = fastify({
  logger: true,
});

app.register(cors, {
  origin: (origin, cb) => {
    if (/localhost/.test(origin)) {
      cb(null, true);
      return;
    }
    cb(new Error("Not allowed"));
  },
});

app.register(helmet);
app.register(routes);

export default app;
