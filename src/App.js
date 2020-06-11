import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories',
      {
        "title": "Desafio",
        "url": "http://github.com/teste",
        "techs": ["Node.js"]
      })

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    if (response.status == "204") {
      setRepositories(repositories.filter(repository => repository.id !== id))
    } else {
      alert('Erro ao excluir repositório');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(respository => (<li key={respository.id}> {respository.title}

            <button onClick={() => handleRemoveRepository(respository.id)}>Remover
          </button>
          </li>))
        }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
