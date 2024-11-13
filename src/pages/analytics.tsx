import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BarChart } from '@/components/charts/bar-chart';

const data = [
  { name: 'Social', value: 400 },
  { name: 'Direct', value: 300 },
  { name: 'Email', value: 200 },
  { name: 'Other', value: 100 },
];

export function Analytics() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
          <CardDescription>Traffic sources for the current month</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart data={data} />
        </CardContent>
      </Card>
    </div>
  );
}