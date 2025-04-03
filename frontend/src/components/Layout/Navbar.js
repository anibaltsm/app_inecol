import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth-service';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Mi Aplicación
        </Typography>
        <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;