import { useState } from 'react'; // Importa o hook useState do React
import { Button, Container, Input, Label, Select, Title, TranslatedText } from './style/Style'; // Importa os componentes estilizados
import { translateText } from '../../../Services/TranslatorService/index'; // Importa a função de tradução

// Componente principal LanguageTranslator
const LanguageTranslator = () => {
  const [text, setText] = useState(''); // Define o estado para o texto a ser traduzido
  const [translatedText, setTranslatedText] = useState(''); // Define o estado para o texto traduzido
  const [sourceLang, setSourceLang] = useState('en'); // Define o estado para a língua de origem
  const [targetLang, setTargetLang] = useState('es'); // Define o estado para a língua de destino

  // Função para traduzir o texto
  const handleTranslateText = async () => {
    try {
      const translated = await translateText(text, sourceLang, targetLang); // Chama a função de tradução
      setTranslatedText(translated); // Armazena o texto traduzido no estado translatedText
    } catch (error) {
      console.error("Error translating text:", error); // Exibe um erro no console em caso de falha
    }
  };

  return (
    <Container>
      <Title>Language Translator</Title>
      <div>
        <Label>Source Language:</Label>
        <Select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
        </Select>
      </div>
      <div>
        <Label>Target Language:</Label>
        <Select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="it">Italian</option>
          <option value="pt">Portuguese</option>
        </Select>
      </div>
      <Input
        type="text"
        value={text} // Valor do campo de entrada é ligado ao estado text
        onChange={(e) => setText(e.target.value)} // Atualiza o estado text conforme o usuário digita
        placeholder="Enter text to translate" // Placeholder do campo de entrada
      />
      <Button onClick={handleTranslateText}>Translate</Button> {/* Botão que chama a função handleTranslateText quando clicado */}
      {translatedText && <TranslatedText>{translatedText}</TranslatedText>} {/* Condicional que exibe o texto traduzido se translatedText não for vazio */}
    </Container>
  );
};

export default LanguageTranslator; // Exporta o componente LanguageTranslator como padrão
