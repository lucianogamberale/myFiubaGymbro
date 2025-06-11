import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

type HistoryEntry = {
  id: number;
  activity: string;
  completion_percentage: number;
  status: string;
  created_at: string;
};

interface Props {
  history: HistoryEntry[];
}

const COLORS = ['#86efac', '#fca5a5'];

export const UserObjectivesCharts = ({ history }: Props) => {
  // Ordenar por fecha ascendente
  const sortedHistory = [...history].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  // Datos para el gráfico de barras
  const barData = sortedHistory.map((entry) => ({
    name: `${entry.activity} (${Math.round(entry.completion_percentage)} cal)`,
    completion: Math.round(entry.completion_percentage),
    calories: Math.round(entry.completion_percentage),
  }));

  // Datos para el gráfico de torta
  const completed = history.filter((h) => h.status === 'completed').length;
  const failed = history.filter((h) => h.status === 'failed').length;
  const pieData = [
    { name: 'Cumplidos', value: completed },
    { name: 'Incumplidos', value: failed },
  ];

  // Promedio de cumplimiento
  const avg = history.length > 0 ? (history.reduce((acc, h) => acc + h.completion_percentage, 0) / history.length) : 0;

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 mt-8">
      <div className="bg-white rounded-xl shadow-md p-4 flex-1">
        <h3 className="text-lg font-semibold mb-2">Porcentaje de Cumplimiento</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Bar dataKey="completion" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
        <div className="text-center text-slate-600 mt-2">
          Promedio de cumplimiento: <span className="font-bold">{avg.toFixed(1)}%</span>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 flex-1">
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
    </div>
  );
};