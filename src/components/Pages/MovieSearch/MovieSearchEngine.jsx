import { useState } from 'react'; // Importa o hook useState do React
import { searchMoviesService } from '../../../Services/MovieSearchService/index'; // Importa o serviço para buscar filmes
import { Button, Container, Input, MovieCard, MoviesContainer, Title, ErrorMessage } from './style/Style'; // Importa componentes estilizados

// Componente principal MovieSearchEngine
const MovieSearchEngine = () => {
  const [query, setQuery] = useState(''); // Estado para a consulta de busca
  const [movies, setMovies] = useState([]); // Estado para armazenar os filmes
  const [error, setError] = useState(''); // Estado para armazenar mensagens de erro

  // Função para buscar filmes
  const searchMovies = async () => {
    try {
      setError(''); // Limpa mensagens de erro anteriores
      const { data } = await searchMoviesService(query); // Chama o serviço de busca de filmes

      if (data.Response === "True") {
        setMovies(data.Search); // Armazena os dados dos filmes no estado movies
      } else {
        setMovies([]); // Limpa a lista de filmes se a resposta for negativa
        setError("Nenhum filme encontrado. Tente outra busca."); // Define a mensagem de erro amigável ao usuário
      }
    } catch (error) {
      console.error("Erro ao buscar dados do filme:", error); // Exibe um erro no console em caso de falha
      setError("Ocorreu um erro ao buscar os filmes. Por favor, tente novamente."); // Define uma mensagem de erro amigável ao usuário
    }
  };

  return (
    <Container>
      <Title>Motor de Busca de Filmes</Title>
      <Input
        type="text"
        value={query} // Valor do campo de entrada ligado ao estado query
        onChange={(e) => setQuery(e.target.value)} // Atualiza o estado query conforme o usuário digita
        placeholder="Digite o nome de um filme" // Placeholder do campo de entrada
      />
      <Button onClick={searchMovies}>Buscar</Button> {/* Botão que chama a função searchMovies quando clicado */}
      
      {error && <ErrorMessage>{error}</ErrorMessage>} {/* Exibe a mensagem de erro, se houver */}
      
      <MoviesContainer>
        {movies && movies.map((movie) => ( // Verifica se há filmes e os mapeia para exibir MovieCard
          <MovieCard key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} Poster`} /> {/* Exibe o pôster do filme */}
            <h3>{movie.Title}</h3> {/* Exibe o título do filme */}
            <p>{movie.Year}</p> {/* Exibe o ano do filme */}
          </MovieCard>
        ))}
      </MoviesContainer>
    </Container>
  );
};

export default MovieSearchEngine; // Exporta o componente MovieSearchEngine como padrão
