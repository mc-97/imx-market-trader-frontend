import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';

export interface DeleteCollectionFormProps {
  params?: DeleteCollectionFormParams;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface DeleteCollectionFormParams {
  collectionId?: string;
  collectionAddress?: string;
}

export default function DeleteCollectionForm({ params, onSubmit }: DeleteCollectionFormProps) {
  const [collectionIdError, setCollectionIdError] = React.useState(false);

  const validateCollectionId = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      setCollectionIdError(true);
    } else {
      setCollectionIdError(false);
    }
  };

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <DeleteIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Delete Collection
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
              fullWidth
              id="collectionAddress"
              label="Collection Address"
              defaultValue={params?.collectionAddress}
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Confirm Delete
        </Button>
      </Box>
    </Box>
  );
}
