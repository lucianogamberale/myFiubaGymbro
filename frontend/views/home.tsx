import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="nav-title">My Fiuba GymBro</h1>
        <div className="nav-links">
          <Link to="/users">Ver usuarios</Link>
          <Link to="/user_food">Cargar comida</Link>
          <Link to="/registro">Registrarse</Link>
          <Link to="/login">Iniciar sesión</Link>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="main-content">
        <h2 className="main-title">
          Bienvenido a tu compañero de entrenamiento
        </h2>
        <p className="main-description">
          Seguí tu progreso, controlá tus rutinas y conectá con otros estudiantes de la FIUBA.
        </p>
        <Link to="/registro" className="cta-button">
          Empezar ahora
        </Link>
      </main>
    </div>
  );
}

export default Home;
