class Match {
    constructor (id_match, titre, date, heure, adresse, joueur1, joueur2, joueur3, joueur4, joueur5, joueur6, fk_id_voiture)
    {
        this.id_match = id_match;
        this.titre = titre;
        this.date = date;
        this.heure = heure;
        this.adresse = adresse;  
        this.joueur1 = joueur1;
        this.joueur2 = joueur2;
        this.joueur3 = joueur3;
        this.joueur4 = joueur4;
        this.joueur5 = joueur5;
        this.joueur6 = joueur6;
        this.fk_id_voiture = fk_id_voiture;
        }
}

module.exports = Match;