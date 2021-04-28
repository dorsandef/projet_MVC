let connection = require('../db.js');
let Match = require('../models/matchmodel.js');
listematchs = [];

// Affichage de tous les Matchs dans une API au format JSON 
exports.matchs = function (req, res) {
    connection.query(" SELECT * from matchs INNER JOIN voitures ON matchs.fk_id_voiture = voitures.id ;", function (error, resultSQL3) {
            if (error) {
                console.log(error);
                res.status(400).json({ "message": error });
            }
            else {
                res.status(200).json(resultSQL3);
        }
    })
};

// Selection d'un match (API) 
exports.getmatch = function (req, res) {

    let id_match = req.params.id_match;
    connection.query("Select * from matchs WHERE `matchs`.`id_match` = ? ", id_match, function (error, resultSQL) {
        if (error) {
            res.status(400).json({ "message": error });
        }
        else {
            res.status(200);
            console.log(resultSQL);
            matchs = resultSQL;
            res.json({matchs : matchs
            });
        }
    });
}

// On ajoute un élément à la liste des matchs 
exports.addmatch = function (req, res) {
    let match = new Match(
        req.body.id_match, req.body.titre, 
        req.body.date, req.body.heure, 
        req.body.adresse, req.body.joueur1, req.body.joueur2,
        req.body.joueur3, req.body.joueur4, req.body.joueur5,
        req.body.joueur6, req.body.fk_id_voiture
        );
    console.log(match);
    connection.query("INSERT INTO matchs set ?", match, function (error, resultSQL) {
        if (error) {
            console.log(error);
            res.status(400).json({ "message": 'error' });
        } else {
            res.status(200).json({ "message": 'success' });
        }
    });
};

// Supprime un élément de la liste des matchs(route API) 
exports.supprmatch = function (req, res) {
    connection.query("DELETE FROM `matchs` WHERE `matchs`.`id_match` = ?", [req.params.id_match], (error, resultSQL) => {
        if (error) {
            res.status(400).json({ "message": 'error' });
        } else {
            res.status(200).json({ "message": 'success' });
        }
    });
};

// Update d'un match (route API) 

exports.updatematch = function (req, res) {
    let match = new Match(
        req.body.id_match, req.body.titre, 
        req.body.date, req.body.heure, 
        req.body.adresse, req.body.joueur1, req.body.joueur2,
        req.body.joueur3, req.body.joueur4, req.body.joueur5,
        req.body.joueur6, req.body.voiturem
        );
    console.log(match);
    connection.query("UPDATE matchs SET ? WHERE id_match = ?",
        [match, req.body.id_match], function (error, resultSQL) {
            if (error) {
                console.log(error);
                res.status(400).json({ "message": 'error' });
            } else {
                res.status(200).json({ "message": 'success' });
        }
    })
};