require('dotenv').config();
const express = require('express');
const app = express();


const clienteRoutes = require('./routes/clienteRoutes');

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Middleware
app.use(express.json());


app.use('/', clienteRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
