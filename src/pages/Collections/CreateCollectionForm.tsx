import * as React from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';

export interface CreateCollectionFormProps {
  params?: CreateCollectionFormParams;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface CreateCollectionFormParams {
  collectionId?: string;
  collectionAddress?: string;
}

export default function CreateCollectionForm({ params, onSubmit }: CreateCollectionFormProps) {
  const [collectionIdError, setCollectionIdError] = React.useState(false);
  const [collectionAddressError, setCollectionAddressError] = React.useState(false);

  const validateCollectionId = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      setCollectionIdError(true);
    } else {
      setCollectionIdError(false);
    }
  };

  const validateCollectionAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      setCollectionAddressError(true);
    } else {
      setCollectionAddressError(false);
    }
  };

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <CreateIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create Collection
      </Typography>
      <Box width="100%" component="form" noValidate onSubmit={onSubmit} sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="collectionId"
              required
              fullWidth
              id="collectionId"
              label="Collection ID"
              autoFocus
              defaultValue={params?.collectionId}
              error={collectionIdError}
              onChange={validateCollectionId}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="collectionAddress"
              required
              fullWidth
              id="collectionAddress"
              label="Collection Address"
              defaultValue={params?.collectionAddress}
              error={collectionAddressError}
              onChange={validateCollectionAddress}
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Confirm Create
        </Button>
      </Box>
    </Box>
  );
}
