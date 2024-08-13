import { useState } from 'react'; // Importa o hook useState do React
import { Button, Input, LoginContainer, LoginForm } from './styles/Style';

// Componente principal de Login
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState(''); // Estado para o nome de usuário
  const [password, setPassword] = useState(''); // Estado para a senha
  const [errorMessage, setErrorMessage] = useState(''); // Estado para a mensagem de erro

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Valida as credenciais
    if (username === 'admin' && password === 'password') {
      onLogin(); // Chama a função onLogin passada como prop se as credenciais estiverem corretas
    } else {
      setErrorMessage('Credenciais inválidas. Por favor, tente novamente.'); // Define a mensagem de erro se as credenciais estiverem incorretas
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Input
          type="text"
          value={username} // Valor do campo de entrada é ligado ao estado username
          onChange={(e) => setUsername(e.target.value)} // Atualiza o estado username conforme o usuário digita
          placeholder="Nome de usuário" // Placeholder do campo de entrada
        />
        <Input
          type="password"
          value={password} // Valor do campo de entrada é ligado ao estado password
          onChange={(e) => setPassword(e.target.value)} // Atualiza o estado password conforme o usuário digita
          placeholder="Senha" // Placeholder do campo de entrada
        />
        <Button type="submit">Entrar</Button> {/* Botão que envia o formulário */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Exibe a mensagem de erro se houver */}
      </LoginForm>
    </LoginContainer>
  );
};

export default Login; // Exporta o componente Login como padrão
