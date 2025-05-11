import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>My Fiuba GymBro</h1>
      <Link to="/users">Ver usuarios</Link>
    </div>
  );
}

export default Home;
