const utilisateurRoute = require("./utilisateurRoute");
const adminRoute = require("./adminRoute");
const departementRoutes = require("./departementRoute");
const salleRoutes = require("./salleRoute");
const parcoursRoutes = require("./parcoursRoutes");
const matieresRoutes = require("./matieresRoutes");
const classesRoutes = require("./classeRoute");
const InscriptionClasse = require("./inscriptionClasseRoute");

const mountRoutes = (app) => {
  app.use("/api/utilisateur", utilisateurRoute);
  app.use("/api/admin", adminRoute);
  app.use("/api/departements", departementRoutes);
  app.use("/api/salles", salleRoutes);
  app.use("/api/parcours", parcoursRoutes);
  app.use("/api/matieres", matieresRoutes);
  app.use("/api/classes", classesRoutes);
  app.use("/api/inscriptions", InscriptionClasse);
};

module.exports = mountRoutes;