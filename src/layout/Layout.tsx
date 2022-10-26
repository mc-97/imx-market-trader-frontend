import * as React from 'react';
import { Box, Container, Grid, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppBarAndMenu from './AppBarAndMenu';
import Copyright from './Copyright';

export default function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarAndMenu />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Outlet />
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </Box>
  );
}
