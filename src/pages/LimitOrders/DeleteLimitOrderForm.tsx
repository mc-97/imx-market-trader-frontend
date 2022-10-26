import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Avatar,
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import {
  Collection,
  CollectionsApiFactory,
  LimitOrderOrderTypeEnum,
  Wallet,
  WalletsApiFactory
} from '../../api';
import { getEnumKeys } from '../../utils/getEnumKeys';

export interface DeleteLimitOrderFormProps {
  params?: DeleteLimitOrderFormParams;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface DeleteLimitOrderFormParams {
  walletId?: string;
  collectionId?: string;
  assetName?: string;
  orderType?: LimitOrderOrderTypeEnum;
}

export default function DeleteLimitOrderForm({ params, onSubmit }: DeleteLimitOrderFormProps) {
  const [walletId, setWalletId] = React.useState(params?.walletId ?? '');

  const handleWalletIdChange = (event: SelectChangeEvent) => {
    setWalletId(event.target.value as string);
  };

  const [collectionId, setCollectionId] = React.useState(params?.collectionId ?? '');

  const handleCollectionIdChange = (event: SelectChangeEvent) => {
    setCollectionId(event.target.value as string);
  };

  const [orderType, setOrderType] = React.useState(params?.orderType ?? '');

  const handleOrderTypeChange = (event: SelectChangeEvent) => {
    setOrderType(event.target.value as string);
  };

  const [assetNameError, setAssetNameError] = React.useState(false);
  const validateAssetName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      setAssetNameError(true);
    } else {
      setAssetNameError(false);
    }
  };

  const [walletsData, setWalletsData] = React.useState<Wallet[]>([]);
  const [collectionsData, setCollectionsData] = React.useState<Collection[]>([]);

  const walletsApi = WalletsApiFactory();
  const collectionsApi = CollectionsApiFactory();

  React.useEffect(() => {
    const fetchWalletsData = async () => {
      const walletsResponse = await walletsApi.walletsControllerFind();
      setWalletsData(walletsResponse.data);
    };
    const fetchCollectionsData = async () => {
      const collectionsResponse = await collectionsApi.collectionsControllerFind();
      setCollectionsData(collectionsResponse.data);
    };

    if (walletsData.length === 0) {
      fetchWalletsData();
    }
    if (collectionsData.length === 0) {
      fetchCollectionsData();
    }
  }, [walletsData, collectionsData]);

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <DeleteIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Delete LimitOrder
      </Typography>
      <Box width="100%" component="form" noValidate onSubmit={onSubmit} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputLabel id="walletIdLabel">Wallet ID</InputLabel>
            <Select
              name="walletId"
              required
              labelId="walletIdLabel"
              id="walletId"
              value={walletId}
              label="Wallet ID"
              onChange={handleWalletIdChange}
              sx={{ width: '100%' }}
            >
              {walletsData.map((wallet) => {
                return (
                  <MenuItem key={wallet._id} value={wallet._id}>
                    {wallet._id}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="collectionIdLabel">Collection ID</InputLabel>
            <Select
              name="collectionId"
              required
              labelId="collectionIdLabel"
              id="collectionId"
              value={collectionId}
              label="Collection ID"
              onChange={handleCollectionIdChange}
              sx={{ width: '100%' }}
            >
              {collectionsData.map((collection) => {
                return (
                  <MenuItem key={collection._id} value={collection._id}>
                    {collection._id}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="assetName"
              required
              fullWidth
              id="assetName"
              label="Asset Name"
              defaultValue={params?.assetName}
              error={assetNameError}
              onChange={validateAssetName}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="orderTypeLabel">Order Type</InputLabel>
            <Select
              name="orderType"
              required
              labelId="orderTypeLabel"
              id="orderType"
              value={orderType}
              label="Order Type"
              onChange={handleOrderTypeChange}
              sx={{ width: '100%' }}
            >
              {getEnumKeys(LimitOrderOrderTypeEnum).map((key) => {
                return (
                  <MenuItem key={key} value={LimitOrderOrderTypeEnum[key]}>
                    {key}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Confirm Delete
        </Button>
      </Box>
    </Box>
  );
}
