import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

type HistoryEntry = {
  id: number;
  activity: string;
  completion_percentage: number;
  status: string;
  created_at: string;
  objective: string;
  end_date: string;
};

interface Props {
  history: HistoryEntry[];
}

const COLORS = ['#86efac', '#fca5a5'];

export const UserObjectivesCharts = ({ history }: Props) => {
  // Ordenar por fecha ascendente
  const sortedHistory = [...history].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  // Datos para el gráfico de barras de calorías
  const barData = sortedHistory
    .filter(entry => entry.status === 'completed' || entry.status === 'failed')
    .map((entry) => {
      const calories = Math.abs(Number(entry.objective));
      const adjustedCalories = entry.activity === 'Perder peso' ? -calories : calories;
      const endDate = new Date(entry.end_date);
      const formattedDate = endDate.toLocaleDateString('es-AR');
      return {
        name: formattedDate,
        calories: adjustedCalories,
        status: entry.status,
        activity: entry.activity,
        rawDate: entry.end_date,
        objective: entry.objective
      };
    });

  // Datos para el gráfico de barras de porcentaje
  const percentageBarData = sortedHistory.map((entry) => ({
    name: entry.activity,
    completion: Math.round(entry.completion_percentage),
    status: entry.status
  }));

  // Datos para el gráfico de torta
  const completed = history.filter((h) => h.status === 'completed').length;
  const failed = history.filter((h) => h.status === 'failed').length;
  const pieData = [
    { name: 'Cumplidos', value: completed },
    { name: 'Incumplidos', value: failed },
  ];

  return (
    <div className="w-full flex flex-col gap-8 mt-8">
      <div className="bg-white rounded-xl shadow-md p-4 w-full mb-8">
        <h3 className="text-lg font-semibold mb-2">Cumplidos vs Incumplidos</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((_, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 w-full">
        <div className="bg-white rounded-xl shadow-md p-4 flex-1">
          <h3 className="text-lg font-semibold mb-2">Calorías Ganadas/Perdidas por Objetivo</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(v) => `${Math.abs(v)} cal`} />
              <Tooltip 
                formatter={(value: number, _name: string, _props: any) => [`${Math.abs(value)} cal`, 'Calorías']}
                labelFormatter={(label) => {
                  const entry = barData.find(d => d.name === label);
                  if (!entry) return label;
                  return `${label} - ${entry.activity} (${entry.objective} cal) - ${entry.status === 'completed' ? 'Cumplido' : 'No cumplido'}`;
                }}
              />
              <Bar 
                dataKey="calories" 
                fill="#6366f1"
              >
                {barData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.status === 'completed' ? '#86efac' : '#fca5a5'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 flex-1">
          <h3 className="text-lg font-semibold mb-2">Porcentaje de Cumplimiento</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={percentageBarData}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(v) => `${v}%`} />
              <Bar 
                dataKey="completion" 
                fill="#6366f1"
              >
                {percentageBarData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.status === 'completed' ? '#86efac' : '#fca5a5'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};