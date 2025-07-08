const express = require('express');
const XLSX = require('xlsx');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;
app.use(require('cors')())

app.use(bodyParser.json());

const FICHIER = 'Base Facturation Handicap.xlsx';
const FEUILLE = 'Feuil1'; // À adapter si le nom de la feuille diffère

function lirePieces() {
    const wb = XLSX.readFile(FICHIER);
    const ws = wb.Sheets[FEUILLE];
    const data = XLSX.utils.sheet_to_json(ws, { defval: '' });
    return { wb, ws, data };
}

function ecrirePieces(data) {
    const wb = XLSX.readFile(FICHIER);
    const ws = XLSX.utils.json_to_sheet(data);
    wb.Sheets[FEUILLE] = ws;
    XLSX.writeFile(wb, FICHIER);
}

// 1. Rechercher une pièce par libellé
app.get('/piece', (req, res) => {
    const { libelle } = req.query;
    if (!libelle) return res.status(400).json({ error: 'libelle requis' });
    const { data } = lirePieces();
    const piece = data.find(row => row.Libellé && row.Libellé.toLowerCase() === libelle.toLowerCase());
    if (!piece) return res.status(404).json({ error: 'Pièce non trouvée' });
    res.json(piece);
});

// 2. Lister les pièces par famille
app.get('/pieces', (req, res) => {
    const { famille } = req.query;
    const { data } = lirePieces();
    if (famille) {
        const filtered = data.filter(row => row.Famille && row.Famille.toLowerCase() === famille.toLowerCase());
        return res.json(filtered);
    }
    res.json(data);
});

// 3. Ajouter une pièce détachée
app.post('/piece', (req, res) => {
    const nouvellePiece = req.body;
    if (!nouvellePiece.Libellé) return res.status(400).json({ error: 'Libellé requis' });
    const { data } = lirePieces();
    data.push(nouvellePiece);
    ecrirePieces(data);
    res.status(201).json({ message: 'Pièce ajoutée', piece: nouvellePiece });
});

// 4. Modifier une pièce détachée (par libellé)
app.put('/piece', (req, res) => {
    const { libelle } = req.query;
    const modifications = req.body;
    if (!libelle) return res.status(400).json({ error: 'libelle requis' });
    const { data } = lirePieces();
    const index = data.findIndex(row => row.Libellé && row.Libellé.toLowerCase() === libelle.toLowerCase());
    if (index === -1) return res.status(404).json({ error: 'Pièce non trouvée' });
    data[index] = { ...data[index], ...modifications };
    ecrirePieces(data);
    res.json({ message: 'Pièce modifiée', piece: data[index] });
});

// 5. Supprimer une pièce détachée (par libellé)
app.delete('/piece', (req, res) => {
    const { libelle } = req.query;
    if (!libelle) return res.status(400).json({ error: 'libelle requis' });
    const { data } = lirePieces();
    const newData = data.filter(row => !(row.Libellé && row.Libellé.toLowerCase() === libelle.toLowerCase()));
    if (newData.length === data.length) return res.status(404).json({ error: 'Pièce non trouvée' });
    ecrirePieces(newData);
    res.json({ message: 'Pièce supprimée' });
});

app.listen(PORT, () => {
    console.log(`API pièces détachées démarrée sur http://localhost:${PORT}`);
}); 