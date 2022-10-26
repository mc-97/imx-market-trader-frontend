import * as React from 'react';
import Title from '../../components/Title';
import { Grid, Paper, Typography } from '@mui/material';
import CollectionsCount from './CollectionsCount';
import WalletsCount from './WalletsCount';
import LimitOrdersCount from './LimitOrdersCount';
import NftAssetssCount from './NftAssetsCount';

export default function Dashboard() {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>Dashboard</Title>
          <Typography>Manage collections, wallets and limit orders</Typography>
        </Paper>
      </Grid>
      <WalletsCount />
      <CollectionsCount />
      <LimitOrdersCount />
      <NftAssetssCount />
    </React.Fragment>
  );
}
