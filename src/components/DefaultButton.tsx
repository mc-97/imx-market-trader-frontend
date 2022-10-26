import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, SxProps, Theme } from '@mui/material';

interface ButtonProps {
  onClick?: () => void;
  to?: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function DefaultButton(props: ButtonProps) {
  const onClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (props.onClick) {
      props.onClick();
    }
  };

  const output = props.to ? (
    <Button
      variant="contained"
      onClick={onClick}
      component={RouterLink}
      to={props.to}
      sx={props.sx}
    >
      {props.children}
    </Button>
  ) : (
    <Button variant="contained" onClick={onClick} sx={props.sx}>
      {props.children}
    </Button>
  );
  return output;
}
