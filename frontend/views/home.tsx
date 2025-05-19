import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
import { useState } from "react";
// import {
//   RadialBarChart,
//   RadialBar,
//   PolarAngleAxis
// } from "recharts";
import "./Styles/home.css";

// type ExerciseEntry = {
//   id: number;
//   exercise_name: string;
//   duration: number;
//   calories: number;
//   date_done: string;
// };

function Home() {

  const [openMenu, setOpenMenu] = useState<null | string>(null);
  // const [objectivesList, setObjectivesList] = useState<ExerciseEntry[]>([]);
  // const userId = 1;

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  // const fetchObjectives = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:8000/api/user-objectives/${userId}`);
  //     if (!response.ok) throw new Error("Error al obtener los ejercicios");
  //     const data = await response.json();
  //     setObjectivesList(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchObjectives();
  // }, []);

  // const total = objectivesList.reduce((sum, ex) => sum + ex.duration, 0);
  // const totalobjective = total * 0.9;

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="nav-title">myFiubaGymbro</h1>
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

          <div className="dropdown">
            <button className="dropbtn" onClick={() => toggleMenu("objetivos")}>
              Objetivos
            </button>
            {openMenu === "objetivos" && (
              <div className="dropdown-content">
                <Link to="/user_objectives">Cargar objetivo</Link>
              </div>
            )}
          </div>

          <Link to="/charge_user_info">Mis datos</Link>
        </div>
      </nav>

      {/* {total > 0 && (
        <>
          <h3>Objetivo</h3>
          <RadialBarChart
            width={300}
            height={250}
            cx={150}
            cy={125}
            innerRadius={80}
            outerRadius={120}
            barSize={20}
            data={[
              {
                name: "Duración",
                value: totalobjective,
                fill: "#4285F4"
              }
            ]}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, total]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background
              dataKey="value"
            />
            {/* Texto debajo del arco */}
      {/* <text
        x={150}  
        y = { 125}
        textAnchor="middle"
      dominantBaseline="middle"
      style={{ fontSize: 24, fontWeight: 'bold', fill: '#4285F4' }}
      >
      {totalobjective}
    </text>
    </RadialBarChart >
        </>
      )
}   */}

      {/* Contenido principal */}
      <main className="main-content">
        <h2 className="main-title">Bienvenido a tu compañero de entrenamiento</h2>
        <p className="main-description">
          Seguí tu progreso, controlá tus rutinas y conectá con otros estudiantes de la FIUBA.
        </p>
        <Link to="/register" className="cta-button">
          Registrarse
        </Link>
        <Link to="/objectives" className="cta-button">
          Objetivos
        </Link>
      </main>
    </div >
  );
}

export default Home;
