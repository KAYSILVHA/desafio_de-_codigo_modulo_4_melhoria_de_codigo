import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP

// Serviço para buscar dados de IP a partir de uma API
export const fetchIPData = async (ip) => {
  try {
    const url = `https://ipinfo.io/${ip}/json`; // Monta a URL da API com o IP fornecido
    const response = await axios.get(url); // Faz a requisição GET para a API
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    // Lança um erro personalizado em caso de falha na requisição
    throw new Error('Erro ao buscar os dados do IP. Verifique o endereço e tente novamente.');
  }
};
