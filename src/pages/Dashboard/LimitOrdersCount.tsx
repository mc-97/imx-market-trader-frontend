import { Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { LimitOrdersApiFactory } from '../../api';
import DefaultButton from '../../components/DefaultButton';
import Title from '../../components/Title';

export default function LimitOrdersCount() {
  const [limitOrdersCount, setLimitOrdersCount] = React.useState<number>(-1);
  const limitOrdersApi = LimitOrdersApiFactory();

  React.useEffect(() => {
    const fetchData = async () => {
      const limitOrdersResponse = await limitOrdersApi.limitOrdersControllerCount();
      setLimitOrdersCount(limitOrdersResponse.data);
    };

    if (limitOrdersCount === -1) {
      fetchData();
    }
  }, [limitOrdersCount]);

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
        <Title>Limit Orders</Title>
        <Typography component="p" variant="h4">
          {limitOrdersCount > 0 ? limitOrdersCount : 0}
        </Typography>
        <Typography color="text.secondary" gutterBottom={true}>
          total limit orders
        </Typography>
        <DefaultButton to="/limit-orders">Manage Limit Orders</DefaultButton>
      </Paper>
    </Grid>
  );
}
