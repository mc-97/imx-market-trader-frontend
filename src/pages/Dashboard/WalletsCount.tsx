import { Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { WalletsApiFactory } from '../../api';
import DefaultButton from '../../components/DefaultButton';
import Title from '../../components/Title';

export default function WalletsCount() {
  const [walletsCount, setWalletsCount] = React.useState<number>(-1);
  const walletsApi = WalletsApiFactory();

  React.useEffect(() => {
    const fetchData = async () => {
      const walletsResponse = await walletsApi.walletsControllerCount();
      setWalletsCount(walletsResponse.data);
    };

    if (walletsCount === -1) {
      fetchData();
    }
  }, [walletsCount]);

  return (
    <Grid item xs={12} md={3}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 180
        }}
      >
        <Title>Wallets</Title>
        <Typography component="p" variant="h4">
          {walletsCount > 0 ? walletsCount : 0}
        </Typography>
        <Typography color="text.secondary" gutterBottom={true}>
          total wallets
        </Typography>
        <DefaultButton to="/wallets">Manage Wallets</DefaultButton>
      </Paper>
    </Grid>
  );
}
