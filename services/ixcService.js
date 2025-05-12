const axios = require('axios');
require('dotenv').config();

const baseURL = 'https://sistema.novumtelecom.com.br/webservice/v1/cliente';
const headers = {
  'ixcsoft': 'listar',
  'Content-Type': 'application/json'
};

async function buscarClientesIXC() {
  const body = {
    qtype: "cliente.id",
    query: "0",
    oper: ">",
    page: "1",
    rp: "10000"
  };

  const response = await axios.post(baseURL, body, {
    headers,
    auth: {
      username: process.env.IXC_USER,
      password: process.env.IXC_PASSWORD
    }
  });

  const data = response.data?.registros || response.data?.rows || [];

  return data.map(c => ({
    id: c.id,
    razao: c.razao,
    cnpj_cpf: c.cnpj_cpf,
    ie_identidade: c.ie_identidade
  }));
}

module.exports = { buscarClientesIXC };
