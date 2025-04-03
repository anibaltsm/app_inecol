import React, { useState } from 'react';
import { 
  Button, 
  Typography, 
  Paper, 
  Box, 
  CircularProgress,
  Alert,
  Divider,
  Grid
} from '@mui/material';
import axios from 'axios';

const TestConnection = () => {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8003/api/test_connection.php', {
        timeout: 5000 // 5 segundos de timeout
      });
      setTestResult(response.data);
    } catch (err) {
      const errorData = {
        message: err.message,
        response: err.response?.data,
        code: err.code,
        config: {
          url: err.config?.url,
          method: err.config?.method
        }
      };
      setError(errorData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Prueba de Conexión Full Stack
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button 
              variant="contained" 
              onClick={testConnection}
              disabled={loading}
              size="large"
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Probando...' : 'Probar Conexión Completa'}
            </Button>
            
            <Typography variant="body2" color="text.secondary">
              Este test verificará: conexión frontend-backend y backend-database
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>
        
        {error && (
          <Grid item xs={12}>
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography variant="subtitle1">Error en la conexión</Typography>
              <Box component="pre" sx={{ 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-word',
                fontSize: '0.8rem',
                mt: 1
              }}>
                {JSON.stringify(error, null, 2)}
              </Box>
            </Alert>
          </Grid>
        )}
        
        {testResult && (
          <Grid item xs={12}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Resultado de la Prueba
              </Typography>
              
              {testResult.success ? (
                <>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    ¡Conexión exitosa con el backend y la base de datos!
                  </Alert>
                  
                  <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gap: 2
                  }}>
                    <Box>
                      <Typography variant="subtitle2">Datos MySQL:</Typography>
                      <pre style={{ 
                        background: '#f5f5f5', 
                        padding: '10px', 
                        borderRadius: '4px'
                      }}>
                        {JSON.stringify(testResult.data, null, 2)}
                      </pre>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle2">Información de Conexión:</Typography>
                      <pre style={{ 
                        background: '#f5f5f5', 
                        padding: '10px', 
                        borderRadius: '4px'
                      }}>
                        {JSON.stringify(testResult.connection_info, null, 2)}
                      </pre>
                    </Box>
                  </Box>
                </>
              ) : (
                <Alert severity="warning">
                  Error en la conexión con la base de datos
                </Alert>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>
      
      <Box sx={{ mt: 4, fontSize: '0.8rem', color: 'text.secondary' }}>
        <Typography variant="body2">
          <strong>Endpoint probado:</strong> http://localhost:8000/api/test_connection.php
        </Typography>
        <Typography variant="body2">
          <strong>Hora local:</strong> {new Date().toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TestConnection;