import * as React from 'react';
import { Link, Typography } from '@mui/material';

export default function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/mc-97">
        mc-97
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
