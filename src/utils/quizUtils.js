// Função para verificar se a resposta fornecida está correta.
export const checkAnswer = (providedAnswer, correctAnswer) => {
    return providedAnswer === correctAnswer;
  };
  
  // Função para obter o índice da próxima pergunta.
  export const getNextQuestionIndex = (currentIndex, totalQuestions) => {
    const nextIndex = currentIndex + 1;
    return nextIndex < totalQuestions ? nextIndex : -1; // Retorna -1 se não houver mais perguntas.
  };
  