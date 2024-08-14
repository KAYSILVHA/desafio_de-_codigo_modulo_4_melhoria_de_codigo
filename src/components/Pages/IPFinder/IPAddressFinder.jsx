import { useState } from 'react'; // Importa o hook useState do React
import { Button, Container, Input, ResultsContainer, Title, ErrorAlert } from './styles/Style'; // Importa os componentes estilizados
import { fetchIPData } from '../../../Services/IpService/index.js'; // Importa o serviço para buscar dados do IP

// Componente principal IPAddressFinder
const IPAddressFinder = () => {
  const [ip, setIp] = useState(''); // Estado para armazenar o IP digitado pelo usuário
  const [ipData, setIpData] = useState(null); // Estado para armazenar os dados do IP
  const [error, setError] = useState(''); // Estado para armazenar mensagens de erro

  // Função para buscar os dados do IP
  const findIP = async () => {
    try {
      setError(''); // Limpa qualquer erro anterior
      const data = await fetchIPData(ip); // Chama a função de serviço para buscar os dados do IP
      setIpData(data); // Armazena os dados do IP no estado
    } catch (err) {
      setError(err.message); // Define a mensagem de erro caso ocorra uma falha na requisição
    }
  };

  return (
    <Container>
      <Title>IP Address Finder</Title> {/* Título do componente */}
      <Input
        type="text"
        value={ip} // Valor do campo de entrada é ligado ao estado ip
        onChange={(e) => setIp(e.target.value)} // Atualiza o estado ip conforme o usuário digita
        placeholder="Enter IP address" // Placeholder do campo de entrada
      />
      <Button onClick={findIP}>Find IP</Button> {/* Botão que chama a função findIP quando clicado */}
      {error && <ErrorAlert>{error}</ErrorAlert>} {/* Exibe a mensagem de erro em uma caixa de alerta estilizada */}
      {ipData && ( // Condicional que exibe os dados do IP se ipData não for null
        <ResultsContainer>
          <p><strong>IP:</strong> {ipData.ip}</p>
          <p><strong>Location:</strong> {ipData.city}, {ipData.region}, {ipData.country}</p>
          <p><strong>ISP:</strong> {ipData.org}</p>
        </ResultsContainer>
      )}
    </Container>
  );
};

export default IPAddressFinder; // Exporta o componente IPAddressFinder como padrão
