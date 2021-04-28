let connection = require('../db.js');

let Voiture = require('../models/voituremodel.js');
listevoitures = [];

// Route pour la page "effectif" + l'import SQL de voiture + l'import SQL de Joueur
exports.effectif = function (req, res) {
    connection.query(" SELECT * from voitures;", function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        }
        else {
            connection.query(" SELECT * from joueurs;", function (error, resultSQL2) {
                if (error) {
                    res.status(400).send(error);
                }
                else {
                    res.status(200);
                    res.render('effectif.ejs', { listevoitures: resultSQL, listejoueurs: resultSQL2 });
                }
            })
        }
    });
};

// On ajoute un élément à la liste des voitures 
exports.addvoiture = function (req, res) {
    connection.query("INSERT INTO voitures (name) VALUES (?);", req.body.name, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(201).redirect('/effectif');
        }
    });
};

// Supprime un élément de la liste des voitures 
exports.supprvoiture = function (req, res) {
    connection.query("DELETE FROM `voitures` WHERE id = ?;", [req.params.id], (error, resultSQL) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.redirect('/effectif');
        }
    });
};


// modifier un élément de la liste voitures 
exports.updatevoiturepage = function (req, res) {
    let id = req.params.voitureid;
    console.log(id)
    connection.query("Select * from voitures WHERE voitures.id = ? ", id, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        }
        else {
            res.status(200);
            console.log("MA REPONSE");
            console.log(resultSQL);
            voitures = resultSQL;
            res.render('updatevoiture.ejs',
                { id: voitures[0].id, name: voitures[0].name});
        }
    });
}

exports.updatevoiture = function (req, res) {
    connection.query("UPDATE voitures SET name = ? WHERE id = ?;",
        [req.body.name, req.body.id], function (error, resultSQL) {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            } else {
                res.status(202).redirect('/effectif');
        }
     })
};