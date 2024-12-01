const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const { DB_URI } = process.env;

const Departement = require("../../models/departementModel");
const Salle = require("../../models/salleModel");
const Parcours = require("../../models/parcoursModel");
const Matiere = require("../../models/matiereModel");
const Classe = require("../../models/classeModel");

const departementDummyData = [
    { nom: "Informatique", directeur_id: "674b510e2428be3f8d56fdc9" },
    { nom: "Mathématiques", directeur_id: "674b510e2428be3f8d56fdc9" },
    { nom: "Physique", directeur_id: "674b510e2428be3f8d56fdc9" },
    { nom: "Chimie", directeur_id: "674b510e2428be3f8d56fdc9" },
    { nom: "Biologie", directeur_id: "674b510e2428be3f8d56fdc9" },
];

const salleDummyData = [
    { nom: "Salle A", type: "Conference", capacite: 50 },
    { nom: "Salle B", type: "Classroom", capacite: 30 },
    { nom: "Salle C", type: "Laboratory", capacite: 20 },
    { nom: "Salle D", type: "Auditorium", capacite: 100 },
    { nom: "Salle E", type: "Office", capacite: 10 },
];

const parcoursDummyData = [
    { nom: "Développement Logiciel", departement_id: "674c30035385d74608f087de" },
    { nom: "Réseaux et Télécoms", departement_id: "674c30035385d74608f087de" },
    { nom: "Analyse de Données", departement_id: "674c30035385d74608f087de" },
    { nom: "Chimie Industrielle", departement_id: "674c30035385d74608f087de" },
    { nom: "Biotechnologie", departement_id: "674c30035385d74608f087de" },
];

const matiereDummyData = [
    { nom: "Programmation Web", parcours_id: "674c593470aa9580d5593f5c", nature: "Cours", charge: 30 },
    { nom: "Algèbre", parcours_id: "674c593470aa9580d5593f5c", nature: "Cours", charge: 25 },
    { nom: "Physique Quantique", parcours_id: "674c593470aa9580d5593f5c", nature: "Cours", charge: 20 },
    { nom: "Chimie Organique", parcours_id: "674c593470aa9580d5593f5c", nature: "TP", charge: 15 },
    { nom: "Génétique", parcours_id: "674c593470aa9580d5593f5c", nature: "Cours", charge: 25 },
];

const classeDummyData = [
    { nom: "Classe 1A", annee_academique: "2023-2024", parcours_id: "674c748c89d50920e920248d" },
    { nom: "Classe 1B", annee_academique: "2023-2024", parcours_id: "674c748c89d50920e920248d" },
    { nom: "Classe 2A", annee_academique: "2023-2024", parcours_id: "674c748c89d50920e920248d" },
    { nom: "Classe 2B", annee_academique: "2023-2024", parcours_id: "674c748c89d50920e920248d" },
    { nom: "Classe 3A", annee_academique: "2023-2024", parcours_id: "674c748c89d50920e920248d" },
];

mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Database connected!");

        // Insert dummy data
        // await Departement.insertMany(departementDummyData);
        // console.log("Dummy data inserted successfully!");

        // await Salle.insertMany(salleDummyData);
        // console.log("Dummy data for Salle inserted successfully!");

        // await Parcours.insertMany(parcoursDummyData);
        // console.log("Dummy data for Salle inserted successfully!");

        // await Matiere.insertMany(matiereDummyData);
        // console.log("Dummy data for Matiere inserted successfully!");
        
        // await Classe.insertMany(classeDummyData);
        // console.log("Dummy data for Classe inserted successfully!");

        mongoose.connection.close();
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });
