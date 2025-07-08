import React, { useState } from 'react';
import { Container, TextField, Button, Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const API_URL = 'http://localhost:4000'; // Change si ton API Express tourne sur un autre port

export default function Home() {
  const [libelle, setLibelle] = useState('');
  const [famille, setFamille] = useState('');
  const [result, setResult] = useState(null);
  const [familleList, setFamilleList] = useState([]);

  // Recherche par libellé
  const handleSearchLibelle = async () => {
    setResult(null);
    if (!libelle) return;
    const res = await fetch(`${API_URL}/piece?libelle=${encodeURIComponent(libelle)}`);
    if (res.ok) {
      setResult(await res.json());
    } else {
      setResult({ error: "Aucune pièce trouvée pour ce libellé." });
    }
  };

  // Recherche par famille
  const handleSearchFamille = async () => {
    setFamilleList([]);
    if (!famille) return;
    const res = await fetch(`${API_URL}/pieces?famille=${encodeURIComponent(famille)}`);
    if (res.ok) {
      setFamilleList(await res.json());
    } else {
      setFamilleList([]);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Recherche Pièce Détachée</Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Par libellé</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 2, boxShadow: 1, p: 1, maxWidth: 500 }}>
          <TextField
            label="Libellé"
            value={libelle}
            onChange={e => setLibelle(e.target.value)}
            size="small"
            sx={{ flex: 1, background: '#fff' }}
            InputProps={{ style: { color: '#171717', background: '#fff' } }}
            InputLabelProps={{ style: { color: '#171717' } }}
          />
          <Button
            variant="contained"
            onClick={handleSearchLibelle}
            sx={{ ml: 2, height: '40px', minWidth: '120px', fontWeight: 'bold', background: '#171717', color: '#fff', boxShadow: 'none', '&:hover': { background: '#333' } }}
          >
            Rechercher
          </Button>
        </Box>
        {result && (
          <Box sx={{ mt: 2 }}>
            {result.error ? (
              <Typography color="error">{result.error}</Typography>
            ) : (
              <pre style={{ background: '#f5f5f5', padding: 10, borderRadius: 4 }}>
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </Box>
        )}
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6">Par famille</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: 2, boxShadow: 1, p: 1, maxWidth: 500 }}>
          <TextField
            label="Famille"
            value={famille}
            onChange={e => setFamille(e.target.value)}
            size="small"
            sx={{ flex: 1, background: '#fff' }}
            InputProps={{ style: { color: '#171717', background: '#fff' } }}
            InputLabelProps={{ style: { color: '#171717' } }}
          />
          <Button
            variant="contained"
            onClick={handleSearchFamille}
            sx={{ ml: 2, height: '40px', minWidth: '120px', fontWeight: 'bold', background: '#171717', color: '#fff', boxShadow: 'none', '&:hover': { background: '#333' } }}
          >
            Rechercher
          </Button>
        </Box>
        {familleList.length > 0 && (
          <List sx={{ mt: 2, background: '#f5f5f5', borderRadius: 2 }}>
            {familleList.map((lib, idx) => (
              <ListItem key={idx}>
                <ListItemText primary={lib} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}