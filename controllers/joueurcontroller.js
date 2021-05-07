let connection = require('../db.js');
let Joueur = require('../models/joueurmodel.js');
listejoueurs = [];

// On ajoute un élément à la liste des joueurs 
exports.addjoueur = function (req, res) {
    let joueur = new Joueur(req.body.id, req.body.firstname, req.body.lastname, req.body.classement);
    connection.query("INSERT INTO joueurs set ?", joueur, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(201).redirect('/effectif');
        }
    });
};

// Supprime un élément de la liste des joueurs 
exports.supprjoueur = function (req, res) {
    connection.query("DELETE FROM `joueurs` WHERE `joueurs`.`id` = ?", [req.params.id], (error, resultSQL) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.redirect('/effectif');

        }
    });
};

// modifier un élément de la liste joueurs 
exports.updatejoueurpage = function (req, res) {
    let id = req.params.joueurid;
    connection.query("Select * from joueurs WHERE `joueurs`.`id` = ? ", id, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        }
        else {
            res.status(200);
            joueurs = resultSQL;
            res.render('updatejoueur.ejs',
                { id: joueurs[0].id, firstname: joueurs[0].firstname, lastname: joueurs[0].lastname, classement: joueurs[0].classement});
        }
    });
}


exports.updatejoueur = function (req, res) {
    let joueur = new Joueur(req.body.id, req.body.firstname, req.body.lastname, req.body.classement);
    connection.query("UPDATE joueurs SET ? WHERE id = ?",
        [joueur, req.body.id], function (error, resultSQL) {
            if (error) {
                res.status(400).send(error);
            } else {
                res.status(202).redirect('/effectif');
        }
    })
};