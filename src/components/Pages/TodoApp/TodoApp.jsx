import { useState, useEffect } from 'react'; // Importa os hooks useState e useEffect da biblioteca React para gerenciar estado e efeitos colaterais.
import { Button, Container, EditInput, Input, TaskItem, TaskList, Title } from './style/Style'; // Importa os componentes estilizados.
import { fetchTasks, addTask, deleteTask, updateTask } from '../../../Services/TodoService/index'; // Importa funções auxiliares.

// Define a URL da API que será usada para obter, adicionar, editar e excluir tarefas.
const API_URL = 'http://localhost:5000/tasks';

// Define o componente funcional TodoApp.
const TodoApp = () => {
  // Usa o hook useState para criar variáveis de estado para a tarefa atual, lista de tarefas, tarefa em edição e texto da tarefa em edição.
  const [task, setTask] = useState(''); // Estado para a nova tarefa a ser adicionada.
  const [tasks, setTasks] = useState([]); // Estado para a lista de tarefas.
  const [editingTaskId, setEditingTaskId] = useState(null); // Estado para o id da tarefa que está sendo editada.
  const [editingTaskText, setEditingTaskText] = useState(''); // Estado para o texto da tarefa que está sendo editada.

  // Usa o hook useEffect para buscar as tarefas quando o componente é montado.
  useEffect(() => {
    const loadTasks = async () => {
      const tasks = await fetchTasks(API_URL); // Busca as tarefas da API.
      setTasks(tasks); // Atualiza o estado com as tarefas recebidas.
    };
    loadTasks(); // Chama a função para carregar as tarefas.
  }, []);

  // Função que adiciona uma nova tarefa.
  const handleAddTask = async () => {
    if (task) { // Verifica se o campo da tarefa não está vazio.
      const newTask = { text: task }; // Cria um objeto de tarefa com o texto fornecido.
      const addedTask = await addTask(API_URL, newTask); // Adiciona a nova tarefa via API.
      setTasks([...tasks, addedTask]); // Atualiza o estado com a nova tarefa adicionada.
      setTask(''); // Limpa o campo de entrada.
    }
  };

  // Função que exclui uma tarefa.
  const handleDeleteTask = async (id) => {
    await deleteTask(API_URL, id); // Exclui a tarefa via API.
    setTasks(tasks.filter(task => task.id !== id)); // Atualiza o estado removendo a tarefa excluída.
  };

  // Função que inicia o processo de edição de uma tarefa.
  const handleEditTask = (id, text) => {
    setEditingTaskId(id); // Define o id da tarefa que está sendo editada.
    setEditingTaskText(text); // Define o texto da tarefa que está sendo editada.
  };

  // Função que atualiza uma tarefa existente.
  const handleUpdateTask = async (id) => {
    const updatedTask = { text: editingTaskText }; // Cria um objeto de tarefa com o texto atualizado.
    await updateTask(API_URL, id, updatedTask); // Atualiza a tarefa via API.
    setTasks(tasks.map(task => (task.id === id ? { ...task, text: editingTaskText } : task))); // Atualiza o estado com a tarefa modificada.
    setEditingTaskId(null); // Limpa o id da tarefa em edição.
    setEditingTaskText(''); // Limpa o texto da tarefa em edição.
  };

  // Retorna o JSX que define o layout e comportamento do componente.
  return (
    <Container>
      <Title>Todo App</Title> {/* Exibe o título do aplicativo de tarefas */}
      <Input
        type="text"
        value={task} // Define o valor do campo de entrada com o estado da tarefa.
        onChange={(e) => setTask(e.target.value)} // Atualiza o estado da tarefa com o valor do campo de entrada.
        placeholder="Add a new task" // Texto do placeholder do campo de entrada.
      />
      <Button onClick={handleAddTask}>Add Task</Button> {/* Botão para adicionar uma nova tarefa */}
      <TaskList>
        {tasks.map((task) => (
          <TaskItem key={task.id}>
            {editingTaskId === task.id ? (
              <EditInput
                type="text"
                value={editingTaskText} // Define o valor do campo de entrada de edição com o estado da tarefa em edição.
                onChange={(e) => setEditingTaskText(e.target.value)} // Atualiza o estado do texto da tarefa em edição.
                onBlur={() => handleUpdateTask(task.id)} // Atualiza a tarefa quando o campo de entrada perde o foco.
              />
            ) : (
              <>
                {task.text} {/* Exibe o texto da tarefa */}
                <div>
                  <button onClick={() => handleEditTask(task.id, task.text)}>Edit</button> {/* Botão para editar a tarefa */}
                  <button onClick={() => handleDeleteTask(task.id)}>Delete</button> {/* Botão para excluir a tarefa */}
                </div>
              </>
            )}
          </TaskItem>
        ))}
      </TaskList>
    </Container>
  );
};

// Exporta o componente TodoApp para que possa ser utilizado em outras partes da aplicação.
export default TodoApp;
