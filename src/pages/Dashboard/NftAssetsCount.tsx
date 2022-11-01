import { Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { NftAssetsApiFactory } from '../../api';
import Title from '../../components/Title';

export default function NftAssetsCount() {
  const [nftAssetsCount, setNftAssetsCount] = React.useState<number>(-1);
  const nftAssetsApi = NftAssetsApiFactory();

  React.useEffect(() => {
    const fetchData = async () => {
      const nftAssetsResponse = await nftAssetsApi.nftAssetsControllerCount();
      setNftAssetsCount(nftAssetsResponse.data);
    };

    if (nftAssetsCount === -1) {
      fetchData();
    }
  }, [nftAssetsCount]);

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
        <Title>Nft Assets</Title>
        <Typography component="p" variant="h4">
          {nftAssetsCount > 0 ? nftAssetsCount : 0}
        </Typography>
        <Typography color="text.secondary" gutterBottom={true}>
          total nft assets
        </Typography>
      </Paper>
    </Grid>
  );
}
