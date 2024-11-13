import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const customers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    status: 'Active',
    lastOrder: '2024-03-15',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'Active',
    lastOrder: '2024-03-14',
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    status: 'Inactive',
    lastOrder: '2024-03-10',
  },
];

export function Customers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Order</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.email}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.status}</TableCell>
                <TableCell>{customer.lastOrder}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}