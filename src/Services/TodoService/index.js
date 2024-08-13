import axios from 'axios'; // Importa a biblioteca axios para fazer requisições HTTP.

// Função que busca as tarefas da API.
export const fetchTasks = async (url) => {
  const response = await axios.get(url); // Faz uma requisição GET para obter as tarefas.
  return response.data; // Retorna os dados recebidos.
};

// Função que adiciona uma nova tarefa.
export const addTask = async (url, newTask) => {
  const response = await axios.post(url, newTask); // Faz uma requisição POST para adicionar a nova tarefa.
  return response.data; // Retorna a tarefa adicionada.
};

// Função que exclui uma tarefa.
export const deleteTask = async (url, id) => {
  await axios.delete(`${url}/${id}`); // Faz uma requisição DELETE para excluir a tarefa com o id fornecido.
};

// Função que atualiza uma tarefa existente.
export const updateTask = async (url, id, updatedTask) => {
  await axios.put(`${url}/${id}`, updatedTask); // Faz uma requisição PUT para atualizar a tarefa.
};
