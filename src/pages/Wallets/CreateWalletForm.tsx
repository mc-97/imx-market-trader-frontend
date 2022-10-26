import * as React from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { Avatar, Box, Button, Grid, TextField, Typography } from '@mui/material';

export interface CreateWalletFormProps {
  params?: CreateWalletFormParams;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface CreateWalletFormParams {
  walletId?: string;
}

export default function CreateWalletForm({ params, onSubmit }: CreateWalletFormProps) {
  const [walletIdError, setWalletIdError] = React.useState(false);

  const validateWalletId = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      setWalletIdError(true);
    } else {
      setWalletIdError(false);
    }
  };

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <CreateIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create Wallet
      </Typography>
      <Box width="100%" component="form" noValidate onSubmit={onSubmit} sx={{ p: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="walletId"
            required
            fullWidth
            id="walletId"
            label="Wallet ID"
            autoFocus
            defaultValue={params?.walletId}
            error={walletIdError}
            onChange={validateWalletId}
          />
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Confirm Create
        </Button>
      </Box>
    </Box>
  );
}
