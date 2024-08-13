import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP

// Serviço para buscar filmes
export const searchMoviesService = (query) => {
  return axios.get(`http://www.omdbapi.com/?s=${query}&apikey=403abbfe`); // Faz uma requisição GET para a API OMDB
};
