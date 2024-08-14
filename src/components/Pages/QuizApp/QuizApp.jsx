import { useState } from 'react'; // Importa o hook useState da biblioteca React para gerenciar o estado do componente.
import { Container, OptionButton, Question, Score, Title, ErrorMessage } from './style/Style.js'; // Importa os componentes estilizados.
import { questions } from '../../../utils/dataQuestions.js'; // Importa as perguntas do quiz.
import { checkAnswer, getNextQuestionIndex } from '../../../utils/quizUtils.js'; // Importa funções auxiliares.

const QuizApp = () => {
  const [score, setScore] = useState(0); // Estado para armazenar a pontuação do usuário.
  const [currentQuestion, setCurrentQuestion] = useState(0); // Estado para armazenar a pergunta atual.
  const [error, setError] = useState(''); // Estado para armazenar mensagens de erro.

  // Função que é chamada quando o usuário responde uma pergunta.
  const handleAnswer = (answer) => {
    try {
      if (checkAnswer(answer, questions[currentQuestion].answer)) {
        setScore(score + 1); // Se a resposta estiver correta, aumenta a pontuação em 1.
      }
      const nextQuestionIndex = getNextQuestionIndex(currentQuestion, questions.length);
      if (nextQuestionIndex === -1) {
        setError('Não há mais perguntas disponíveis.');
        return;
      }
      setCurrentQuestion(nextQuestionIndex); // Passa para a próxima pergunta.
    } catch (error) {
      setError('Ocorreu um erro ao processar sua resposta.');
      console.error(error); // Exibe o erro no console em caso de falha.
    }
  };

  return (
    <Container>
      <Title>Quiz App</Title> {/* Exibe o título do aplicativo de quiz */}
      {error && <ErrorMessage>{error}</ErrorMessage>} {/* Exibe a mensagem de erro, se houver */}
      {currentQuestion < questions.length ? ( // Verifica se ainda há perguntas para responder.
        <div>
          <Question>{questions[currentQuestion].question}</Question> {/* Exibe a pergunta atual */}
          {questions[currentQuestion].options.map((option) => (
            <OptionButton key={option} onClick={() => handleAnswer(option)}>
              {option}
            </OptionButton> /* Renderiza os botões de opções de resposta */
          ))}
        </div>
      ) : (
        <Score>Sua pontuação: {score}</Score> /* Exibe a pontuação final após responder todas as perguntas */
      )}
    </Container>
  );
};

export default QuizApp; // Exporta o componente QuizApp para que possa ser utilizado em outras partes da aplicação.
