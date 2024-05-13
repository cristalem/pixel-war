/**
 * fonction permettant de recuperer les donner du fichier json contenant les couleurs des pixels
 * du serveur https://pixel-api.codenestedu.fr
 * @returns le tableau de tableaux contenant les couleurs des pixels
 */
const tableauPixel = async () => {
    try {
        let response = await fetch('https://pixel-api.codenestedu.fr/tableau');
        let result = await response.json(); 
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}
const nodeUID = document.getElementById('identification');
const dernierMessageElement = document.getElementById('message');
const nodeColor = document.getElementById('color');
console.log(nodeColor.value)
console.log(nodeUID.value)
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const tempsAttenteElement = document.getElementById('tempsAttente');

/**
 * fonction permettant de dessiner le canvas a l'aide du fichier json 
 * contenant les pixel de couleur sous forme d'un tableau de tableaux
 */
const drawCanvas = async () => {
    const jsonData = await tableauPixel();

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const cellWidth = canvas.width / jsonData[0].length;
    const cellHeight = canvas.height / jsonData.length;

    for (let i = 0; i < jsonData.length; i++) {
        for (let j = 0; j < jsonData[i].length; j++) {
            ctx.fillStyle = jsonData[i][j];
            ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
        }
    }
}
drawCanvas();

/**
 * changement du pixel lors du clique sur le canvas
 */
canvas.addEventListener('click', async function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const jsonData = await tableauPixel(); 
    const cellWidth = canvas.width / jsonData[0].length;
    const cellHeight = canvas.height / jsonData.length;

    const clickedCol = Math.floor(x / cellWidth);
    const clickedRow = Math.floor(y / cellHeight);

    const tempsData = await temps(); 
    const equipeData = await recupeEquipe(); 

    if (tempsData.tempsAttente === 0 && equipeData.equipe !== 0) {
        const requestData = {
            color: nodeColor.value,
            uid: nodeUID.value,
            col: clickedCol,
            row: clickedRow
        };

        try {
            const apiUrl = 'https://pixel-api.codenestedu.fr/modifier-case';
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                const result = await response.json();
                dernierMessageElement.textContent = result.msg;
                console.log('Couleur modifiée avec succès.');
                
                drawCanvas(); 
                const intervalId = setInterval(updateTempsAttente, 1000);

                // Arrêtez d'appeler updateTempsAttente après 15 secondes
                setTimeout(() => {
                    clearInterval(intervalId);
                    console.log("Fin de l'appel à updateTempsAttente après 15 secondes.");
                    tempsAttenteElement.textContent = "Vous pouvez poser un pixel !";
                }, 15000);
            } else {
                console.error('Erreur lors de la modification de la couleur.');
            }
        } catch (error) {
            console.error('Erreur lors de la requête :', error);
        }
    }
});

drawCanvas();
setInterval(drawCanvas, 5000); 

/**
 * recuperation du temps d'attente d'un joueur
 * @returns temps d'attente du joueur en milliseconde
 */
const temps = async () => {
    try {
        let response = await fetch('https://pixel-api.codenestedu.fr/temps-attente?uid='+nodeUID.value);
        let result = await response.json(); 
        
        dernierMessageElement.textContent = result.msg;
        return result;
    } catch (error) {
        console.error('Error:', error);
        dernierMessageElement.textContent = result.msg;
    }
}

/**
 * affichage du temps d'attente du joueur 
 */
const updateTempsAttente = async () => {
    const result = await temps();
    
    if (result && result.tempsAttente !== undefined) {
        tempsAttenteElement.textContent = "Temps d'attente du joueur: " + Math.floor(result.tempsAttente / 1000); + " secondes";
    } else {
        tempsAttenteElement.textContent = "Impossible de récupérer le temps d'attente.";
    }
}
/**
 * recuperation de l'equipe d'un joueur
 * @returns l'equipe du joueur en milliseconde
 */
const recupeEquipe = async () => {
    try {
        let response = await fetch('https://pixel-api.codenestedu.fr/equipe-utilisateur?uid=' + nodeUID.value);
        let result = await response.json(); 
        console.log(result);
        dernierMessageElement.textContent = result.msg;
        return result;
    } catch (error) {
        console.error('Error:', error);
        
    }
}

recupeEquipe();

// Sélectionnez tous les éléments de radio pour l'équipe
const equipes = document.querySelectorAll('input[name="equipe"]');

/**
 * change l'equipe du joueur en fonction de l'equipe passe en paramettre
 * @param {*} newEquipe 
 */
const changeEquipe = async (newEquipe) => {
    try {
        const requestBody = {
            "uid": nodeUID.value,
            "nouvelleEquipe": parseInt(newEquipe)
        };

        const response = await fetch('https://pixel-api.codenestedu.fr/choisir-equipe', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const data = await response.json();
            dernierMessageElement.textContent = data.msg;
        }

        const data = await response.json();
        console.log('Réponse du serveur:', data);
        dernierMessageElement.textContent = data.msg;
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'équipe:', error);
    }
};

let changingEquipe = false;

// Fonction pour activer ou désactiver les radio boutons d'équipe
const setEquipesDisabled = (disabled) => {
    equipes.forEach((equipe) => {
        equipe.disabled = disabled;
    });
};

// Ajouter l'événement à chaque bouton radio d'équipe
equipes.forEach((equipe) => {
    equipe.addEventListener('change', async (event) => {
        if (changingEquipe) {
            event.preventDefault();
            return;
        }

        const newEquipe = event.target.value;

        try {
            setEquipesDisabled(true);

            await changeEquipe(newEquipe);

            changingEquipe = true;
            setTimeout(() => {
                changingEquipe = false;
                setEquipesDisabled(false); 
            }, 10000); 
        } catch (error) {
            const currentEquipe = await recupeEquipe();
            if (currentEquipe) {
                equipes.forEach((radio) => {
                    if (radio.value === currentEquipe.toString()) {
                        radio.checked = true; 
                    }
                });
            }
            console.error('Erreur lors du changement d\'équipe:', error);
        }
    });
});


/**
 * recupere les joueurs recents
 * @returns tableau des joueur recent
 */
const tableauJoueurRecent = async() => {
    try {
        let response = await fetch('https://pixel-api.codenestedu.fr/liste-joueurs?uid=' + nodeUID.value);
        let result = await response.json(); 
        dernierMessageElement.textContent = result.msg;
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
}
tableauJoueurRecent();

/**
 * affiche les joueurs récents dans le tableau HTML
 */
const afficherTableauJoueurRecent = async () => {
    try {
        const result = await tableauJoueurRecent();

        if (result && Array.isArray(result)) {
            const tbody = document.querySelector('table tbody');

            tbody.innerHTML = '';

            result.forEach(joueur => {
                const row = document.createElement('tr');

                const nomCell = document.createElement('td');
                nomCell.textContent = joueur.nom;
                row.appendChild(nomCell);

                const equipeCell = document.createElement('td');
                equipeCell.textContent = joueur.equipe;
                row.appendChild(equipeCell);

                const modificationCell = document.createElement('td');
                const lastModificationDate = new Date(joueur.lastModificationPixel);
                modificationCell.textContent = lastModificationDate.toLocaleString();
                row.appendChild(modificationCell);

                const banniCell = document.createElement('td');
                banniCell.textContent = joueur.banned ? 'Oui' : 'Non';
                row.appendChild(banniCell);

                tbody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des joueurs:', error);
        dernierMessageElement.textContent = "Erreur lors de la récupération des joueurs.";
    }
};
setInterval(afficherTableauJoueurRecent, 5000); 

