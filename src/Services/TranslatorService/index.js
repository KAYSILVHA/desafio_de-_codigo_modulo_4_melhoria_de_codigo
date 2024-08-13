import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP

// Função que traduz o texto usando a API MyMemory
export const translateText = async (text, sourceLang, targetLang) => {
  try {
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text, // Texto a ser traduzido
        langpair: `${sourceLang}|${targetLang}`, // Par de línguas para tradução
      },
    });
    return response.data.responseData.translatedText; // Retorna o texto traduzido
  } catch (error) {
    console.error("Error translating text:", error); // Exibe um erro no console em caso de falha
    throw error; // Repassa o erro para que possa ser tratado no componente
  }
};
