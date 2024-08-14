import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP

// Função para obter o token JWT (exemplo: armazenado no localStorage)
const getToken = () => {
  return localStorage.getItem('token'); // Ajuste conforme sua lógica de autenticação
};

// Serviço para buscar dados de IP a partir de uma API com JWT e validação
export const fetchIPData = async (ip) => {
  // Valida o IP antes de fazer a requisição
  const validateIP = (ip) => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
  };

  if (!validateIP(ip)) {
    throw new Error('Endereço IP inválido. Por favor, insira um IP no formato correto (ex.: 192.168.0.1).');
  }

  try {
    const token = getToken(); // Obtém o token JWT
    const url = `https://ipinfo.io/${ip}/json`;

    // Configuração do cabeçalho com o token JWT
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };

    const response = await axios.get(url, config); // Faz a requisição GET para a API com autenticação
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Token inválido ou expirado. Faça login novamente.');
    } else {
      throw new Error('Erro ao buscar os dados do IP. Verifique o endereço e tente novamente.');
    }
  }
};
