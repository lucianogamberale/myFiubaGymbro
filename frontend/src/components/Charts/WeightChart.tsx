import {
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { UserHealthDataEntry } from '../ItemsList/UserHealthDataList';

interface Props {
    data: UserHealthDataEntry[];
}

export const WeightChart = ({ data }: Props) => {
    const formattedData = data
        .slice()
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map(entry => ({
            ...entry,
            date: new Date(entry.date).toLocaleDateString('es-AR', {
                day: '2-digit',
                month: '2-digit',
            }),
        }));

    return (
        <div className="h-72 bg-gradient-to-br from-white to-slate-100 rounded-xl shadow-lg p-6 mb-6 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-4">📈 Evolución del peso</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={formattedData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                    <defs>
                        <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke="#e5e7eb" />
                    <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={50}
                    />
                    <YAxis unit=" kg" tick={{ fontSize: 12 }} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #ccc' }}
                        labelStyle={{ color: '#4b5563', fontWeight: 500 }}
                        formatter={(value: number) => [`${value} kg`, 'Peso']}
                    />
                    <Area
                        type="basis"
                        dataKey="weight"
                        stroke="#4f46e5"
                        fillOpacity={1}
                        fill="url(#colorWeight)"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
