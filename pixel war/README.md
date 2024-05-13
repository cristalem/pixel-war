### Pixel IUT War

Ce projet "Pixel IUT War" est une application web interactive qui permet aux utilisateurs de modifier des pixels sur un canvas. Les pixels peuvent être modifiés avec différentes couleurs et sont soumis à des restrictions de temps d'attente entre chaque modification. Voici un guide pour comprendre et utiliser ce projet :

### Fonctionnalités

- **Identification Obligatoire** : Avant de pouvoir effectuer des modifications, les utilisateurs doivent saisir leur identifiant dans le champ dédié.
  
- **Choix de Couleur** : Permet de choisir la couleur du pixel à placer sur le canvas en utilisant un sélecteur de couleur.

- **Temps d'Attente** : Affiche le temps restant avant qu'un utilisateur puisse effectuer une nouvelle modification de pixel.

- **Choix d'Équipe** : Les utilisateurs peuvent choisir leur équipe parmi quatre options en sélectionnant un bouton radio.

- **Affichage des Joueurs** : Un tableau affiche les informations sur les joueurs récents, y compris leur nom, équipe, date de dernière modification de pixel et leur statut de bannissement.

- **Interaction avec le Canvas** : Les utilisateurs peuvent cliquer sur le canvas pour placer un pixel de la couleur choisie, sous réserve de restrictions de temps et d'équipe.

### Utilisation

1. **Identification** : Commencez par saisir votre identifiant dans le champ prévu à cet effet.

2. **Sélection de Couleur** : Utilisez le sélecteur de couleur pour choisir la couleur du pixel que vous souhaitez placer.

3. **Choix d'Équipe** : Sélectionnez votre équipe en cliquant sur le bouton radio correspondant.

4. **Placement de Pixel** : Cliquez sur le canvas à l'endroit désiré pour placer un pixel de la couleur choisie. Assurez-vous que le temps d'attente est écoulé et que vous appartenez à une équipe valide.

5. **Temps d'Attente** : Après chaque placement de pixel, un temps d'attente est requis avant la prochaine modification.

6. **Affichage des Joueurs** : Consultez le tableau pour voir les informations sur les joueurs récents.

### Remarques

- Assurez-vous d'avoir une connexion Internet active pour interagir avec le serveur.
- Les fonctionnalités sont limitées par les règles définies côté serveur, y compris le temps d'attente entre les modifications et les restrictions d'équipe.
  
---

### Technologies Utilisées

- **JavaScript** : Pour la logique de l'application côté client.
- **HTML/CSS** : Pour la structure et le style de la page web.
- **Fetch API** : Pour effectuer des requêtes HTTP asynchrones vers le serveur.
- **Canvas API** : Pour dessiner et manipuler les pixels sur le canvas.
- **Serveur Backend** : L'application communique avec un serveur distant via des requêtes HTTP pour récupérer des données et effectuer des actions.

---

### Développement

Pour exécuter ce projet localement :

1. Clonez ce dépôt sur votre machine locale.
2. Ouvrez le fichier `index.html` dans votre navigateur web.
3. Assurez-vous d'avoir une connexion Internet active pour interagir avec le serveur distant.
4. Explorez les fonctionnalités en suivant les instructions fournies ci-dessus.

### Notes Supplémentaires

- Ce projet est destiné à des fins éducatives et de démonstration.
- Pour toute question ou problème, veuillez consulter le code source et les commentaires intégrés pour une meilleure compréhension.

---
  
### Auteur

Ce projet a été développé par Elsa MAZZETTI dans le cadre d'un exercice pratique du BUT informatique. N'hésitez pas à explorer et à expérimenter avec les fonctionnalités disponibles. Amusez-vous bien !

---
