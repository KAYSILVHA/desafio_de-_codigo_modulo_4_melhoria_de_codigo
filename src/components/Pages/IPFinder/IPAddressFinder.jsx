import { useState } from 'react'; // Importa o hook useState do React
import { Button, Container, Input, ResultsContainer, Title, ErrorAlert } from './styles/Styles'; // Importa os componentes estilizados
import { fetchIPData } from '../../../Services/IpService/i'; // Importa o serviço para buscar dados do IP

// Componente principal IPAddressFinder
const IPAddressFinder = () => {
  const [ip, setIp] = useState(''); // Estado para armazenar o IP digitado pelo usuário
  const [ipData, setIpData] = useState(null); // Estado para armazenar os dados do IP
  const [error, setError] = useState(''); // Estado para armazenar mensagens de erro

  // Função para validar o IP digitado
  const validateIP = (ip) => {
    // Expressão regular para validar o formato de um endereço IPv4
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip); // Retorna true se o IP for válido, caso contrário, false
  };

  // Função para buscar os dados do IP
  const findIP = async () => {
    // Verifica se o IP é válido antes de prosseguir
    if (!validateIP(ip)) {
      setError('O endereço IP inserido parece inválido. Por favor, verifique e insira um IP no formato correto (ex.: 192.168.0.1).'); // Define a mensagem de erro se o IP for inválido
      return; // Sai da função se o IP for inválido
    }

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
