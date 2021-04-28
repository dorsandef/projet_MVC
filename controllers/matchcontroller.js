let connection = require('../db.js');

let Match = require('../models/matchmodel.js');
listematchs = [];

//recherche match
exports.recherchematch = function (req, res) {
    connection.query(" SELECT * from matchs WHERE titre LIKE ?;", "%"+ req.body.recherche + "%", function (error, resultSQL3) {
        if (error) {
            res.status(400).send(error);
        }
        else {
            res.status(200);
            res.render('matchs.ejs', { listematchs: resultSQL3 });
         }
     });
 };

// Route pour la page "Matchs" + l'import SQL des matchs 
exports.matchs = function (req, res) {
    connection.query(" SELECT * from matchs INNER JOIN voitures ON matchs.fk_id_voiture = voitures.id ;", function (error, resultSQL3) {
        if (error) {
            res.status(400).send(error);
        }
        else {
            connection.query(" SELECT * from voitures;", function (error, resultSQL) {
                if (error) {
                    res.status(400).send(error);
                }
                else {
                    res.status(200);
                    console.log(resultSQL)
                    res.render('matchs.ejs', { listematchs: resultSQL3, listevoitures: resultSQL});
                } 
            });
        };
    })
};

// On ajoute un élément à la liste des matchs 
exports.addmatch = function (req, res) {
    let match = new Match(req.body.id_match, req.body.titre, req.body.date, req.body.heure, req.body.adresse, req.body.joueur1, req.body.joueur2, 
        req.body.joueur3, req.body.joueur4, req.body.joueur5, req.body.joueur6, req.body.fk_id_voiture);
    console.log(match);
    connection.query("INSERT INTO matchs set ?", match, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        } else {
            res.status(201).redirect('/matchs');
        }
    });
};

// Supprime un élément de la liste des matchs 
exports.supprmatch = function (req, res) {
    connection.query( "DELETE FROM `matchs` WHERE matchs.id_match = ?", [req.params.id_match], (error, resultSQL) => {
        if (error) {
            res.status(400).send(error);
        } else {
            res.redirect('/matchs');
        }
    });
};

// modifier un élément de la liste matchs
exports.updatematchpage = function (req, res) {
    let id_match = req.params.id_match;
    connection.query(" SELECT * from matchs INNER JOIN voitures ON matchs.fk_id_voiture = voitures.id WHERE matchs.id_match = ? ;", id_match, function (error, resultSQL) {
        if (error) {
            res.status(400).send(error);
        }
        else {
            connection.query(" SELECT * from voitures;", function (error, resultvoiture) {
                if (error) {
                    res.status(400).send(error);
                }
                else {
                    res.status(200);
                    matchs = resultSQL;
                    res.render( 'updatematch.ejs', {id: matchs[0].id_match, titre: matchs[0].titre, date: matchs[0].date, 
                    heure: matchs[0].heure, adresse: matchs[0].adresse, joueur1: matchs[0].joueur1, joueur2: matchs[0].joueur2,
                    joueur3: matchs[0].joueur3, joueur4: matchs[0].joueur4, joueur5: matchs[0].joueur5, joueur6: matchs[0].joueur6, 
                    fk_id_voiture: matchs[0].fk_id_voiture, listevoitures : resultvoiture});
                } 
            });
        };
    })
};

// fonction d'update 
exports.updatematch = function (req, res) {
    let match = new Match(req.body.id_match, req.body.titre, req.body.date, req.body.heure, req.body.adresse, req.body.joueur1, 
        req.body.joueur2, req.body.joueur3, req.body.joueur4, req.body.joueur5, req.body.joueur6, req.body.fk_id_voiture);
    console.log(match);
    connection.query("UPDATE matchs SET ? WHERE id_match = ?", [match, req.body.id_match], function (error, resultSQL) {
            if (error) {
                console.log(error);
                res.status(400).send(error);
            } 
            else {
                res.status(202).redirect('/matchs');
        }
    })
};