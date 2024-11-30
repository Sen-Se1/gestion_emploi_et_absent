const utilisateurRoute = require("./utilisateurRoute");
const adminRoute = require("./adminRoute");

const mountRoutes = (app) => {
  app.use("/api/utilisateur", utilisateurRoute);
  app.use("/api/admin", adminRoute);
};

module.exports = mountRoutes;
