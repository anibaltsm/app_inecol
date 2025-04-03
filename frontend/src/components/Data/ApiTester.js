import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { getCurrentUser } from '../services/auth';

function ApiTester() {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [requestData, setRequestData] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const testApi = async () => {
    setLoading(true);
    try {
      const user = getCurrentUser();
      const config = {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      };

      let res;
      if (method === 'GET') {
        res = await axios.get(url, config);
      } else if (method === 'POST') {
        res = await axios.post(url, JSON.parse(requestData), config);
      } else if (method === 'PUT') {
        res = await axios.put(url, JSON.parse(requestData), config);
      } else if (method === 'DELETE') {
        res = await axios.delete(url, config);
      }

      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Probador de API</Typography>
      
      <Box sx={{ mb: 2 }}>
        <TextField
          select
          label="Método"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          SelectProps={{ native: true }}
          sx={{ minWidth: 120, mr: 2 }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </TextField>
        
        <TextField
          fullWidth
          label="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="http://localhost:8000/api/endpoint"
        />
      </Box>
      
      {['POST', 'PUT'].includes(method) && (
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Datos (JSON)"
          value={requestData}
          onChange={(e) => setRequestData(e.target.value)}
          sx={{ mb: 2 }}
        />
      )}
      
      <Button 
        variant="contained" 
        onClick={testApi} 
        disabled={loading || !url}
      >
        {loading ? 'Probando...' : 'Probar API'}
      </Button>
      
      {response && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6" gutterBottom>Respuesta:</Typography>
          <pre>{response}</pre>
        </Paper>
      )}
    </Box>
  );
}

export default ApiTester;