import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/users')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al obtener usuarios');
        }
        return res.json();
      })
      .then((data: User[]) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <h1>Usuarios {users.length}</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>id:{user.id} nombre: {user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
