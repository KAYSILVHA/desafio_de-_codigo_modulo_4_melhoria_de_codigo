import { useState } from 'react'; // Importa o hook useState da biblioteca React para gerenciar o estado do componente.
import QRCode from 'qrcode.react'; // Importa o componente QRCode da biblioteca qrcode.react para gerar códigos QR.
import { Container, Input, QRCodeContainer, Title, ErrorMessage } from './style/Style'; // Importa os componentes estilizados.

const QRCodeGenerator = () => {
  const [text, setText] = useState(''); // Estado para armazenar o texto que será codificado no QR Code.

  return (
    <Container>
      <Title>Gerador de QR Code</Title> {/* Título do gerador de QR Code */}
      
      <Input
        type="text"
        value={text} // Valor do campo de entrada ligado ao estado 'text'.
        onChange={(e) => setText(e.target.value)} // Atualiza o estado 'text' conforme o usuário digita.
        placeholder="Digite o texto para codificar" // Placeholder do campo de entrada.
      />

      {/* Exibe uma mensagem de erro se o campo estiver vazio */}
      {!text && <ErrorMessage>Por favor, insira algum texto para gerar o QR Code.</ErrorMessage>}

      {/* Renderiza o QRCode apenas se 'text' não estiver vazio */}
      {text && (
        <QRCodeContainer>
          <QRCode value={text} size={256} /> {/* Gera o QR Code com o texto atual e tamanho 256px */}
        </QRCodeContainer>
      )}
    </Container>
  );
};

export default QRCodeGenerator; // Exporta o componente QRCodeGenerator como padrão
