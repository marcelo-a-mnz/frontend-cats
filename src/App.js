import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const baseUrl = 'https://backend-cats.vercel.app';

  // Função para carregar os usuários
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao carregar os usuários', error);
    }
  };

  // Função para adicionar um novo usuário
  const addUser = async () => {
    if (name && email) {
      try {
        const response = await axios.post(`${baseUrl}/users`, {
          name,
          email,
        });
        setUsers((prevUsers) => [...prevUsers, response.data]);
        setName('');
        setEmail('');
      } catch (error) {
        console.error('Erro ao adicionar o usuário', error);
      }
    } else {
      alert('Nome e email são obrigatórios!');
    }
  };

  // Função para deletar um usuário
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${baseUrl}/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Erro ao deletar o usuário', error);
    }
  };

  // Carregar os usuários quando o componente for montado
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>Gerenciamento de Usuários</h1>

      {/* Formulário de Cadastro */}
      <div>
        <h2>Cadastrar Novo Usuário</h2>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={addUser}>Adicionar Usuário</button>
      </div>

      {/* Lista de Usuários */}
      <h2>Lista de Usuários</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
            <button onClick={() => deleteUser(user.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
