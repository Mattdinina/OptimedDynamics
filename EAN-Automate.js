const XLSX = require("xlsx");
const fs = require("fs");

// Charger le fichier Excel
const fichier = "Base_PHARMAOUEST_Test_CLASSIF.xlsx";
const wb = XLSX.readFile(fichier);
// Charger les trois onglets nécessaires
const wsMedical = wb.Sheets['Base de donnée Medical X'];
const wsAlliance = wb.Sheets[' PN MEDICALLIANCE 2024'];
const wsPrivilege = wb.Sheets['PRIVILEGE 2024'];

if (!wsMedical || !wsAlliance || !wsPrivilege) {
    console.error('Un ou plusieurs onglets manquent dans le fichier Excel.');
    process.exit(1);
}

// Convertir les feuilles en tableaux
const donneesMedical = XLSX.utils.sheet_to_json(wsMedical, { header: 1 });
const donneesAlliance = XLSX.utils.sheet_to_json(wsAlliance, { header: 1 });
const donneesPrivilege = XLSX.utils.sheet_to_json(wsPrivilege, { header: 1 });

// Fonction utilitaire pour créer un mapping référence => UDI à partir d'un tableau
function creerMappingRefUdi(donnees) {
    const mapping = {};
    for (let i = 1; i < donnees.length; i++) {
        const ref = donnees[i][2]; // Colonne C : Référence (index 2)
        const udi = donnees[i][10]; // Colonne K : UDI (index 10)
        if (ref && udi) {
            mapping[ref] = udi;
        }
    }
    return mapping;
}

// Créer les mappings pour les deux onglets
const refToUdiAlliance = creerMappingRefUdi(donneesAlliance);
const refToUdiPrivilege = creerMappingRefUdi(donneesPrivilege);

// Supprimer tous les codes UDI/EAN existants dans la colonne D de l'onglet Medical

// Pour chaque ligne de l'onglet Medical, si la référence existe dans l'un des mappings, on écrit le code UDI en colonne D
let nbUdiAjoutes = 0;
for (let i = 1; i < donneesMedical.length; i++) {
    // S'assurer qu'il y a au moins 6 colonnes (pour la référence en F)
    while (donneesMedical[i].length < 6) {
        donneesMedical[i].push('');
    }
    // S'assurer qu'il y a au moins 4 colonnes (pour écrire en D)
    while (donneesMedical[i].length < 4) {
        donneesMedical[i].push('');
    }
    const ref = donneesMedical[i][5]; // Colonne F : Référence (index 5)
    if (ref) {
        if (refToUdiAlliance[ref]) {
            donneesMedical[i][3] = refToUdiAlliance[ref];
            nbUdiAjoutes++;
        } else if (refToUdiPrivilege[ref]) {
            donneesMedical[i][3] = refToUdiPrivilege[ref];
            nbUdiAjoutes++;
        } else {
            donneesMedical[i][3] = 'none';
        }
    }
}

console.log('Aperçu colonne D après traitement :', donneesMedical.map(row => row[3]).slice(0, 20));

// Reconstruire la feuille et sauvegarder
const nouvelleFeuille = XLSX.utils.aoa_to_sheet(donneesMedical);
wb.Sheets['Base de donnée Medical X'] = nouvelleFeuille;

const outputFile = 'Base_PHARMAOUEST_Test_CLASSIF.xlsx';
XLSX.writeFile(wb, outputFile);

console.log(`UDI/EAN copiés dans la colonne D de l'onglet 'Base de donnée Medical X' ! (${nbUdiAjoutes} codes ajoutés)`);
console.log('Fichier sauvegardé sous : Base_PHARMAOUEST_Test_CLASSIF.xlsx');

