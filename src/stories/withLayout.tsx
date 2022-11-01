import * as React from 'react';
import { Box, Container, CssBaseline, Grid, ThemeProvider, Toolbar } from '@mui/material';
import AppBarAndMenu from '../layout/AppBarAndMenu';
import Copyright from '../layout/Copyright';
import theme from '..//theme';

export const withLayout = (story: any) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
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
              {story()}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
