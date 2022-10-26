import { Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { CollectionsApiFactory } from '../../api';
import DefaultButton from '../../components/DefaultButton';
import Title from '../../components/Title';

export default function CollectionsCount() {
  const [collectionsCount, setCollectionsCount] = React.useState<number>(-1);
  const collectionsApi = CollectionsApiFactory();

  React.useEffect(() => {
    const fetchData = async () => {
      const collectionsResponse = await collectionsApi.collectionsControllerCount();
      setCollectionsCount(collectionsResponse.data);
    };

    if (collectionsCount === -1) {
      fetchData();
    }
  }, [collectionsCount]);

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
        <Title>Collections</Title>
        <Typography component="p" variant="h4">
          {collectionsCount}
        </Typography>
        <Typography color="text.secondary" gutterBottom={true}>
          total collections
        </Typography>
        <DefaultButton to="/collections">Manage Collections</DefaultButton>
      </Paper>
    </Grid>
  );
}
