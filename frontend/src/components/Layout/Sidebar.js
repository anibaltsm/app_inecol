import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart';
import ApiIcon from '@mui/icons-material/Api';

function Sidebar() {
  return (
    <div style={{ width: 250 }}>
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/tables">
          <ListItemIcon><TableChartIcon /></ListItemIcon>
          <ListItemText primary="Tablas" />
        </ListItem>
        <ListItem button component={Link} to="/api-test">
          <ListItemIcon><ApiIcon /></ListItemIcon>
          <ListItemText primary="Probador API" />
        </ListItem>
      </List>
    </div>
  );
}

export default Sidebar;