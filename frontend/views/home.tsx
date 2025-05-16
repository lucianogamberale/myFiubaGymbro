// import { Link } from "react-router-dom";
// import "./Styles/home.css";

// function Home() {
//   return (
//     <div className="home-container">
//       {/* Navbar */}
//       <nav className="navbar">
//         <h1 className="nav-title">My Fiuba GymBro</h1>
//         <div className="nav-links">
//           <Link to="/user_food">Cargar comida</Link>
//           <Link to="/My_user_food">Mis comidas</Link>
//           <Link to="/user_exercise">Cargar ejercicio</Link>
//           <Link to="/My_user_exersice">Mis ejercicios</Link>
//           <Link to="/charge_user_info">Mis datos</Link>
//         </div>
//       </nav>

//       {/* Contenido principal */}
//       <main className="main-content">
//         <h2 className="main-title">
//           Bienvenido a tu compañero de entrenamiento
//         </h2>
//         <p className="main-description">
//           Seguí tu progreso, controlá tus rutinas y conectá con otros estudiantes de la FIUBA.
//         </p>
//         <Link to="/register" className="cta-button">
//           Registrarse
//         </Link>
//       </main>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { useState } from "react";
import "./Styles/home.css";

function Home() {
  const [openMenu, setOpenMenu] = useState<null | string>(null);

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="nav-title">My Fiuba GymBro</h1>
        <div className="nav-links">
          <div className="dropdown">
            <button className="dropbtn" onClick={() => toggleMenu("comida")}>
              Comida
            </button>
            {openMenu === "comida" && (
              <div className="dropdown-content">
                <Link to="/user_food">Cargar comida</Link>
                <Link to="/My_user_food">Mis comidas</Link>
              </div>
            )}
          </div>

          <div className="dropdown">
            <button className="dropbtn" onClick={() => toggleMenu("ejercicio")}>
              Ejercicios
            </button>
            {openMenu === "ejercicio" && (
              <div className="dropdown-content">
                <Link to="/user_exercise">Cargar ejercicio</Link>
                <Link to="/My_user_exersice">Mis ejercicios</Link>
              </div>
            )}
          </div>

          <Link to="/charge_user_info">Mis datos</Link>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="main-content">
        <h2 className="main-title">Bienvenido a tu compañero de entrenamiento</h2>
        <p className="main-description">
          Seguí tu progreso, controlá tus rutinas y conectá con otros estudiantes de la FIUBA.
        </p>
        <Link to="/register" className="cta-button">
          Registrarse
        </Link>
      </main>
    </div>
  );
}

export default Home;
