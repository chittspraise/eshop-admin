'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
  } from 'recharts';
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'

  type LatestUser = {
    id: string;
    email: string;
    date: string;
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

type MonthlyOrderData = {
    name: string;   
    orders:number;
    total_price: number;
    refunded_amount: number;
};

type CategoryData = {
    name: string;
    products: number;
};
 const PageComponent = ({
    monthlyOrders,
    categoryData,
    latestUsers,
 }: {
    categoryData:  CategoryData[];
    monthlyOrders: MonthlyOrderData[]; 
    latestUsers: LatestUser[];
 }) => {
  return (
    <div className='flex-1 p-8 overflow-auto'>
      <h1 className='text-3xl font-bold nb-6'>Dashboard Overview</h1>
      <div className="grid grid-cols-1 nd:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer 
              width="100%" 
              height={300}>
              <BarChart 
                data={monthlyOrders}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="orders" fill="#8884d8" />
                    <Bar dataKey="total_price" fill="#82ca9d" />
                    <Bar dataKey="refunded_amount" fill="#ff0000" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Product Distribution</CardTitle>
           </CardHeader>
              <CardContent>
                <ResponsiveContainer 
                  width="100%" 
                  height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="products"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      labelLine={false}
                        label={({name,percent}) => 
                            `${name} ${(percent * 100).toFixed(0)}%`
                    } 
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                         key={`cell-${index}`} 
                         fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>

        </Card>
        {/* category to products charts */}
        <Card>
            <CardHeader>
                <CardTitle>Products per Category</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer
                    width="100%"
                    height={300}>
                    <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="products" fill="#82ca9d" />
                    </BarChart>
                    </ResponsiveContainer>
            </CardContent>
        </Card>
        {/* latest user */}

        <Card>
            <CardHeader>
                <CardTitle>Latest Users</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {latestUsers.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.date}.</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PageComponent
