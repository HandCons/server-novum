const { buscarClientesIXC } = require('../services/ixcService');
const db = require('../database/db'); // Aqui você conecta com o seu banco de dados
require('dotenv').config();

async function sincronizarClientes(req, res) {
  try {
    const clientes = await buscarClientesIXC();
    const simularBanco = process.env.SIMULACAO_BANCO === 'true'; // Variável de ambiente

    if (simularBanco) {
      // Simulação
      console.log('Simulação de inserção no banco de dados:');
      for (const cliente of clientes) {
        console.log({
          id: cliente.id,
          razao: cliente.razao,
          cnpj_cpf: cliente.cnpj_cpf,
          ie_identidade: cliente.ie_identidade
        });
      }

      return res.status(200).json({
        message: 'Simulação concluída com sucesso, clientes inseridos no pré-cadastro',
        total: clientes.length
      });
    } else {
      // Inserção real no banco de dados
      for (const cliente of clientes) {
        await db.query(
          `INSERT INTO employee (id, name, cpf, rg)
           VALUES (?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
           name = VALUES(razao),
           cpf = VALUES(cnpj_cpf),
           rg = VALUES(ie_identidade)`,
          [cliente.id, cliente.razao, cliente.cnpj_cpf, cliente.ie_identidade]
        );
      }

      res.status(200).json({
        message: 'Clientes sincronizados com sucesso',
        total: clientes.length
      });
    }
  } catch (err) {
    console.error('Erro ao sincronizar clientes:', err.message);
    res.status(500).json({ error: 'Erro ao sincronizar clientes' });
  }
}

module.exports = { sincronizarClientes };
