// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis
} from "recharts";
import "./Styles/home.css";

type ObjectivesEntry = {
  activity: string;
  objective: number;
  unit_of_measurement: string;
};

function WatchUserObjectives() {
  // const [objective, setobjective] = useState<ObjectivesEntry[]>([]);
  const [objective, setObjective] = useState<ObjectivesEntry | null>(null);
  const userId = 1;

  const fetchObjectives = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/user-objectives/${userId}`);
      if (!response.ok) throw new Error("Error al obtener los ejercicios");
      const data = await response.json();
      setObjective(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchObjectives();
  }, []);

  const total = objective?.objective || 0
  const totalobjective = total * 0.9;

  return (
    <div className="home-container">
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
            name: "Objetivo",
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
        <text
          x={150}
          y={125}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: 24, fontWeight: 'bold', fill: '#4285F4' }}
        >
          {totalobjective.toFixed(0)}
        </text>
      </RadialBarChart >
    </div>
  );
}

export default WatchUserObjectives;

// import {
//   RadialBarChart,
//   RadialBar,
//   PolarAngleAxis
// } from "recharts";
// import "./Styles/home.css";

// function WatchUserObjectives() {
//   // 🔵 Datos hardcodeados
//   const objective = [
//     {
//       activity: "Correr",
//       objective: 50,
//       unit_of_measurement: "km"
//     },
//     {
//       activity: "Bici",
//       objective: 40,
//       unit_of_measurement: "km"
//     }
//   ];

//   const total = objective.reduce((sum, ex) => sum + ex.objective, 0);
//   const totalobjective = total * 0.9;

//   return (
//     <div className="home-container">
//       <h3>Objetivo</h3>
//       <RadialBarChart
//         width={300}
//         height={250}
//         cx={150}
//         cy={125}
//         innerRadius={80}
//         outerRadius={120}
//         barSize={20}
//         data={[
//           {
//             name: "Objetivo",
//             value: totalobjective,
//             fill: "#4285F4"
//           }
//         ]}
//         startAngle={180}
//         endAngle={0}
//       >
//         <PolarAngleAxis
//           type="number"
//           domain={[0, total]}
//           angleAxisId={0}
//           tick={false}
//         />
//         <RadialBar
//           background
//           dataKey="value"
//         />
//         <text
//           x={150}
//           y={125}
//           textAnchor="middle"
//           dominantBaseline="middle"
//           style={{ fontSize: 24, fontWeight: 'bold', fill: '#4285F4' }}
//         >
//           {totalobjective.toFixed(0)}
//         </text>
//       </RadialBarChart >
//     </div>
//   );
// }

// export default WatchUserObjectives;
