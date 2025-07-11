import React from 'react';
import { Box, Typography, Button, Paper, List, ListItem, ListItemButton, ListItemText, TextField, Avatar, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const menuItems = [
  { label: 'Fauteuils électriques', img: '/fauteuil-roulant-express.jpg' },
  { label: 'Fauteuils roulants', img: '/Fauteuil roulant.jpg' },
  { label: 'Fauteuils sportifs', img: '/1736725815_MPIC001338_Pro_Basket.jpg' },
  { label: 'Fournisseur', img: null },
];

const imageGallery = [
  {
    src: '/fauteuil-roulant-express.jpg',
    alt: 'Fauteuil roulant express',
    label: 'Fauteuil roulant express',
  },
  {
    src: '/Fauteuil roulant.jpg',
    alt: 'Fauteuil roulant',
    label: 'Fauteuil roulant',
  },
  {
    src: '/1736725815_MPIC001338_Pro_Basket.jpg',
    alt: 'Fauteuil basket',
    label: 'Fauteuil basket',
  },
];

export default function Home() {
  const [selected, setSelected] = React.useState(0);
  const [categorie, setCategorie] = React.useState('libellé');
  const selectedImage = menuItems[selected].img;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f8f8', position: 'relative' }}>
      {/* Header + avatar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" sx={{ mx: 'auto', color: 'black', fontWeight: 'bolder', textAlign: 'center' }}>OptimedDynamics</Typography>
        <Box sx={{ position: 'absolute', top: 16, right: 32 }}>
          <Avatar sx={{ bgcolor: '#fff', border: '2px solid #171717', width: 48, height: 48 }}>
            <PersonIcon sx={{ color: '#171717', fontSize: 36 }} />
          </Avatar>
        </Box>
      </Box>

      {/* Menu + contenu principal */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', mt: 4 }}>
        {/* Menu vertical */}
        <Paper elevation={0} sx={{ bgcolor: '#ededed', minWidth: 180, mr: 2, p: 1 }}>
          <List>
            {menuItems.map((item, idx) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  selected={selected === idx}
                  onClick={() => setSelected(idx)}
                  sx={{
                    bgcolor: selected === idx ? '#3f51b5' : 'inherit',
                    color: selected === idx ? '#fff' : '#171717',
                    fontWeight: selected === idx ? 'bold' : 'normal',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Zone centrale */}
        <Box sx={{ flex: 1, ml: 2 }}>
          {/* Barre de recherche et catégorie */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2, maxWidth: 600 }}>
            <FormControl variant="filled" size="small" sx={{ bgcolor: '#e5e3e3', minWidth: 180, maxWidth: 180 }}>
              <InputLabel id="categorie-label" sx={{ color: '#171717' }}>Catégorie</InputLabel>
              <Select
                labelId="categorie-label"
                value={categorie}
                onChange={e => setCategorie(e.target.value)}
                disableUnderline
                sx={{ background: '#e5e3e3', color: '#171717' }}
              >
                <MenuItem value="libellé">Libellé</MenuItem>
                <MenuItem value="famille">Famille</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Recherche..."
              variant="filled"
              size="small"
              sx={{ bgcolor: '#e5e3e3', width: '170%' }}
              InputProps={{ disableUnderline: true, style: { background: '#e5e3e3' } }}
              InputLabelProps={{ style: { color: '#171717' } }}
            />
          </Box>
          {/* Image fauteuil */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, minHeight: 300 }}>
            {selectedImage && (
              <img
                src={selectedImage}
                alt={menuItems[selected].label}
                style={{ maxWidth: '100%', maxHeight: '420px', borderRadius: 8, boxShadow: '0 2px 12px #0001', transition: '0.2s' }}
              />
            )}
          </Box>
        </Box>
      </Box>

      {/* Mentions légales */}
      <Typography variant="body2" sx={{ position: 'absolute', bottom: 24, right: 48, fontWeight: 'bold' }}>Mentions légales</Typography>
    </Box>
  );
}