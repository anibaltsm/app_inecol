import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';
import { getCurrentUser } from '../../services/auth-service';

function DataTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = getCurrentUser();  // Obtén el usuario actual (y el token, si es necesario)
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/productos.php`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,  // Si tu API requiere autenticación
          },
        });
        setData(response.data.data);  // Asigna los productos obtenidos
      } catch (error) {
        setError('Error al obtener los datos');
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);  // Este efecto se ejecuta solo una vez cuando el componente se monta

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Precio</TableCell>
            <TableCell>Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.precio}</TableCell>
              <TableCell>{row.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable;