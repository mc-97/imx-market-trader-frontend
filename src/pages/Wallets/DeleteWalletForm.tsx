import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';

export interface DeleteWalletFormProps {
  params?: DeleteWalletFormParams;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface DeleteWalletFormParams {
  walletId?: string;
}

export default function DeleteWalletForm({ params, onSubmit }: DeleteWalletFormProps) {
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
        <DeleteIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Delete Wallet
      </Typography>
      <Box width="100%" component="form" noValidate onSubmit={onSubmit} sx={{ p: 3 }}>
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
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Confirm Delete
        </Button>
      </Box>
    </Box>
  );
}
