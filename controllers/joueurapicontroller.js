let connection = require('../db.js');

let Joueur = require('../models/joueurmodel.js');
listejoueurs = [];

// affichage joueurs (route API) 
exports.effectifj = function (req, res) {
    connection.query(" SELECT * from joueurs;", function (error, result) {
        if (error) {
            console.log(error);
            res.status(400).json({ "message": error });
        }
        else {
            res.status(200).json(result);
        }
    })
};

// Affichage d'un joueur (route API) 
exports.getjoueur = function (req, res) {
    let id = req.params.id;
    connection.query("Select * from joueurs WHERE joueurs.id = ? ", id, function (error, resultSQL) {
        if (error) {
            res.status(400).json({ "message": 'error' });
        }
        else {
            res.status(200);
            console.log("MA REPONSE");
            console.log(resultSQL);
            joueurs = resultSQL;
            res.json(
                { id: joueurs[0].id, firstname: joueurs[0].firstname, lastname: joueurs[0].lastname, classement: joueurs[0].classement });
        }
    });
}
    
// On ajoute un joueur à la liste des joueurs (route API) 
exports.addjoueur = function (req, res) {
    let joueur = new Joueur (req.body.id, req.body.firstname, req.body.lastname, req.body.classement);
    console.log(joueur);
    connection.query("INSERT INTO joueurs set ?", joueur, function (error, resultSQL) {
        if (error) {
            console.log(error);
            res.status(400).json({ "message": 'error' });
        } else {
            res.status(200).json({ "message": 'success' });
        }
    });
};

// Supprime un élément de la liste des joueurs (route API) 
exports.supprjoueur = function (req, res) {
    connection.query("DELETE FROM `joueurs` WHERE joueurs.id = ?", [req.params.id], (error, resultSQL) => {
        if (error) {
            res.status(400).json({ "message": 'error '});
        } else {
            res.status(200).json({ "message": 'success' });
        }
    });
};

// Update d'une joueur (route API) 

exports.updatejoueur = function (req, res) {
    let joueur = new Joueur(req.body.id, req.body.firstname, req.body.lastname, req.body.classement);
    console.log(joueur);
    connection.query("UPDATE joueurs SET ? WHERE id = ?",
        [joueur, req.body.id], function (error, resultSQL) {
            if (error) {
                console.log(error);
                res.status(400).json({ "message": 'error' });
            } else {
                res.status(200).json({ "message": 'success' });
        }
    })
};