import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import CollectionsIcon from '@mui/icons-material/Collections';
import { Link as RouterLink } from 'react-router-dom';

export default function NavMenu() {
  return (
    <React.Fragment>
      <ListItemButton component={RouterLink} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/wallets">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Wallets" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/collections">
        <ListItemIcon>
          <CollectionsIcon />
        </ListItemIcon>
        <ListItemText primary="Collections" />
      </ListItemButton>
      <ListItemButton component={RouterLink} to="/limit-orders">
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Limit Orders" />
      </ListItemButton>
    </React.Fragment>
  );
}
