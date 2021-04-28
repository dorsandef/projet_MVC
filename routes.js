let express = require('express');
let router = express.Router();

//**********MVC********// 

// les routes MVC 
let accueilcontroller = require('./controllers/accueilcontroller.js');
let voiturecontroller = require('./controllers/voiturecontroller.js');
let joueurcontroller = require('./controllers/joueurcontroller.js');
let matchcontroller = require('./controllers/matchcontroller.js');

// recherche
router.post('/matchs/rechercher', matchcontroller.recherchematch);

// les routes des trois pages
router.get('/', (req, res) => res.redirect('/accueil'))
// Route pour la page "Accueil" 
router.get('/accueil', accueilcontroller.accueil);
// Route pour la page "Effectif" 
router.get('/effectif', voiturecontroller.effectif);
// Route pour la page "Matchs" 
router.get('/matchs', matchcontroller.matchs);

// voitures MVC
// On ajoute un élément à la liste des voitures 
router.post('/effectif/ajouter/', voiturecontroller.addvoiture);
// Supprime un élément de la liste des voitures 
router.get('/effectif/supprimer/:id', voiturecontroller.supprvoiture);
// Modifier un élément de la liste voitures 
router.get('/effectif/update/:voitureid', voiturecontroller.updatevoiturepage);
router.post('/effectif/update', voiturecontroller.updatevoiture);

// joueurs MVC 
// On ajoute un élément à la liste des joueurs 
router.post('/effectifj/ajouter/', joueurcontroller.addjoueur);
// Supprime un élément de la liste des joueurs
router.get('/effectifj/supprimer/:id', joueurcontroller.supprjoueur);
// Modifier un élément de la liste joueurs 
router.get('/effectifj/update/:joueurid', joueurcontroller.updatejoueurpage);
router.post('/effectifj/update', joueurcontroller.updatejoueur);

// matchs MVC 
// On ajoute un élément à la liste des matchs 
router.post('/matchs/ajouter/', matchcontroller.addmatch);
// Supprime un élément de la liste des matchs 
router.get('/matchs/supprimer/:id_match', matchcontroller.supprmatch);
// Modifier un élément de la liste matchs 
router.get('/matchs/update/:id_match', matchcontroller.updatematchpage);
router.post('/matchs/update', matchcontroller.updatematch);

//********API***********// 

//les routes API
let voitureapicontroller = require('./controllers/voitureapicontroller.js');
let joueurapicontroller = require('./controllers/joueurapicontroller.js');
let matchapicontroller = require('./controllers/matchapicontroller.js');

//affichage voitures
router.get('/api/effectif/', voitureapicontroller.effectif);
//affichage d'une voiture
router.get('/api/effectif/:id', voitureapicontroller.getvoiture);
// Ajout d'une voiture
router.post('/api/effectif/', voitureapicontroller.addvoiture);
// Suppression d'une voiture
router.delete('/api/effectif/:id', voitureapicontroller.supprvoiture);
// Modification d'une voiture
router.put('/api/effectif/:id', voitureapicontroller.updatevoiture);

// Affichage joueurs
router.get('/api/effectifj/', joueurapicontroller.effectifj);
// affichage d'un joueur
router.get('/api/effectifj/:id', joueurapicontroller.getjoueur);
// Ajout d'un joueur
router.post('/api/effectifj/', joueurapicontroller.addjoueur);
// Suppression d'un joueur
router.delete('/api/effectifj/:id', joueurapicontroller.supprjoueur);
// Modification d'un joueur
router.put('/api/effectifj/:id', joueurapicontroller.updatejoueur);

// Affichage liste des matches 
router.get('/api/matchs/', matchapicontroller.matchs);
// affichage d'un match 
router.get('/api/matchs/:id_match', matchapicontroller.getmatch);
// Ajout d'un Match 
router.post('/api/matchs/', matchapicontroller.addmatch);
// Suppression d'un Match 
router.delete('/api/matchs/:id_match', matchapicontroller.supprmatch);
// Modification d'un Match 
router.put('/api/matchs/:id_match', matchapicontroller.updatematch);

module.exports = router;

