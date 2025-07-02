const xlsx = require('xlsx');
const fs = require('fs');

// 1. Charger le fichier Excel
const fichier = 'Base Facturation Handicap.xlsx';
const workbook = xlsx.readFile(fichier);
const sheet = workbook.Sheets['Feuil1'];
const data = xlsx.utils.sheet_to_json(sheet);

// 2. Structuration : Famille > Sous-famille > Libellés
const structure = {};

data.forEach(row => {
  const famille = row['Famille'] || 'Aucune Famille';
  const sousFamille = row['Sous famille'] || 'Aucune Sous-famille';
  const libelle = row['Libellé article'];

  if (!libelle) return;

  if (!structure[famille]) structure[famille] = {};
  if (!structure[famille][sousFamille]) structure[famille][sousFamille] = [];

  structure[famille][sousFamille].push(libelle);
});

// 3. Sauvegarde dans un fichier JSON
fs.writeFileSync(
  'structure_familles.json',
  JSON.stringify(structure, null, 2),
  'utf8'
);

console.log('✅ Export terminé : structure_familles.json généré avec succès.');
