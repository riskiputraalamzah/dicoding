import Hapi from "@hapi/hapi";
import booksRoutes from "./routes/booksRoutes.js";
import config from "./config/server.js";

const init = async () => {
  const server = Hapi.server({
    port: config.port,
    host: "localhost",
    routes: {
      cors: { origin: ["*"] }, // Mengizinkan CORS
    },
  });

  server.route(booksRoutes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
