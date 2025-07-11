import React from 'react';
import { Box, TextField, Button, Typography, Paper, Grid, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

export default function ConnectionPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f8f8', position: 'relative' }}>
      {/* Header + avatar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" sx={{ mx: 'auto', color: 'black', color: 'black', fontWeight: 'bolder', textAlign: 'center' }}>OptimedDynamics</Typography>
        <Box sx={{ position: 'absolute', top: 16, right: 32 }}>
          <Avatar sx={{ bgcolor: '#fff', border: '2px solid #171717', width: 48, height: 48 }}>
            <PersonIcon sx={{ color: '#171717', fontSize: 36 }} />
          </Avatar>
        </Box>
      </Box>

      {/* Bloc central */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Paper elevation={0} sx={{ bgcolor: '#d9d9d9', p: 4, borderRadius: 2, minWidth: 900 }}>
          <Grid container spacing={4}>
            {/* Connexion */}
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ bgcolor: '#a9a6a6', p: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>Se connecter</Typography>
                <TextField label="Email" variant="filled" fullWidth sx={{ mb: 2, bgcolor: '#d9d9d9' }} InputProps={{ disableUnderline: true, style: { background: '#d9d9d9' } }} />
                <TextField label="Mot de passe" type="password" variant="filled" fullWidth sx={{ mb: 2, bgcolor: '#d9d9d9' }} InputProps={{ disableUnderline: true, style: { background: '#d9d9d9' } }} />
                <Button variant="contained" sx={{ bgcolor: '#ededed', color: '#171717', fontWeight: 'bold', boxShadow: 'none', mt: 1, '&:hover': { bgcolor: '#cfcfcf' } }} fullWidth>Connection</Button>
              </Paper>
            </Grid>
            {/* Inscription */}
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ bgcolor: '#a9a6a6', p: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>Créer un compte</Typography>
                <TextField label="Email" variant="filled" fullWidth sx={{ mb: 2, bgcolor: '#d9d9d9' }} InputProps={{ disableUnderline: true, style: { background: '#d9d9d9' } }} />
                <TextField label="Mot de passe" type="password" variant="filled" fullWidth sx={{ mb: 2, bgcolor: '#d9d9d9' }} InputProps={{ disableUnderline: true, style: { background: '#d9d9d9' } }} />
                <Button variant="contained" sx={{ bgcolor: '#ededed', color: '#171717', fontWeight: 'bold', boxShadow: 'none', mt: 1, '&:hover': { bgcolor: '#cfcfcf' } }} fullWidth>S'enregistrer</Button>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Mentions légales */}
      <Typography variant="body2" sx={{ position: 'absolute', bottom: 24, right: 48, fontWeight: 'bold' }}>Mentions légales</Typography>
    </Box>
  );
}