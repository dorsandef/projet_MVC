//variables toujours au début du script
var express = require('express');
var app = express();
let bodyParser = require('body-parser');
//let cookieParser = require('cookie-parser');
//permet de recuperer les exports de routes.js
let router = require('./routes');

//envoyer des infos dans l'url 
app.use(express.urlencoded({extended:true}));
//décodage du body sous format JSON
app.use(express.json());

//permet d'afficher les fichiers css
app.use(express.static("public"));

//permet de ne pas utiliser de cookies
//app.use(cookieParser());

//utilisation de bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//sur le site on utilise les routes définie dans routes. 
app.use('/', router);

//CSS/Images par EJS
app.use("/public", express.static('public'));

//launch server
app.listen(3000, function () {
    console.log('Server is running on port 3000')
});

