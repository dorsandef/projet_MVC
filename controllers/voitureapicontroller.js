let connection = require('../db.js');
let Voiture = require('../models/voituremodel.js');
listevoitures = [];

// Affichage de la liste des voitures au format JSON (route API) 
exports.effectif = function (req, res) {
    connection.query(" SELECT * from voitures;", function (error, result) {
        if (error) {
            res.status(400).json({ "message": error });
        }
        else {
            res.status(200).json(result);
        }
    })
};

// Affichage d'une voiture dans l'API au format JSON (route API) 
exports.getvoiture = function (req, res) {
    let id = req.params.id;
    connection.query("SELECT * from voitures WHERE voitures.id = ? ", id, function (error, resultSQL) {
        if (error) {
            res.status(400).json({ "message": error });
        }
        else {
            res.status(200);
            voitures = resultSQL;
            res.json({ id: voitures[0].id, name: voitures[0].name });
        }
    });
}

// On ajoute une voiture à la liste des voitures au format JSON (route API) 
exports.addvoiture = function (req, res) {
    let voiture = new Voiture(req.body.id, req.body.name);
    connection.query("INSERT INTO voitures set ?", voiture, function (error, resultSQL) {
        if (error) {
            res.status(400).json({ "message": 'error' });
        } else {
            res.status(200).json({ "message": 'success' });
        }
    });
};

// Supprime un élément de la liste des voitures (route API) 
exports.supprvoiture = function (req, res) {
    connection.query("DELETE FROM `voitures` WHERE voitures.id = ?", [req.params.id], (error, resultSQL) => {
        if (error) {
            res.status(400).json({ "message": 'error' });
        } else {
            res.json({ "message": 'success' });
        }
    });
};

// Update d'une voiture (route API) 
exports.updatevoiture = function (req, res) {
    let voiture = new Voiture(req.body.id, req.body.name);
    connection.query("UPDATE voitures SET ? WHERE id = ?", [voiture, req.body.id], function (error, result) {
            if (error) {
                res.status(400).json({ "message": 'error' });
            } else {
                res.status(202).json({ "message": 'success' });
        }
    })
};