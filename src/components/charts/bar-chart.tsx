import { useMemo } from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  name: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
  height?: number;
}

export function BarChart({ data, height = 400 }: BarChartProps) {
  const theme = useMemo(() => ({
    background: 'hsl(var(--background))',
    text: 'hsl(var(--foreground))',
    border: 'hsl(var(--border))',
    primary: 'hsl(var(--primary))',
  }), []);

  const axisProps = {
    stroke: theme.border,
    style: { fontSize: '12px' },
    tick: { fill: theme.text },
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.border} />
        <XAxis
          {...axisProps}
          dataKey="name"
          padding={{ left: 0, right: 0 }}
          tickMargin={12}
        />
        <YAxis
          {...axisProps}
          width={60}
          tickMargin={8}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: theme.background,
            border: `1px solid ${theme.border}`,
            borderRadius: '6px',
            fontSize: '12px',
          }}
          labelStyle={{ color: theme.text, marginBottom: '4px' }}
          itemStyle={{ color: theme.text }}
        />
        <Bar
          dataKey="value"
          fill={theme.primary}
          radius={[4, 4, 0, 0]}
          maxBarSize={50}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}