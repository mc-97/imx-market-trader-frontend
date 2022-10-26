import * as React from 'react';
import Dialog from '@mui/material/Dialog';

export interface FormModalProps {
  open: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
}

export default function FormModal({ open, handleClose, children }: FormModalProps) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        maxWidth="sm"
      >
        {children}
      </Dialog>
    </React.Fragment>
  );
}
