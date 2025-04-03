import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { getCurrentUser } from '../../services/auth-service';

function DataTable() {
  const [data, setData] = useState([
    { id: 1, nombre: 'Producto A', precio: 100, stock: 20 },
    { id: 2, nombre: 'Producto B', precio: 200, stock: 15 },
    { id: 3, nombre: 'Producto C', precio: 300, stock: 10 }
  ]);
  const [loading, setLoading] = useState(false);

/*   useEffect(() => {
    const fetchData = async () => {
      try {
        const user = getCurrentUser();
        const response = await axios.get('http://localhost:8000/api/data.php', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); */

  if (loading) return <div>Cargando...</div>;

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