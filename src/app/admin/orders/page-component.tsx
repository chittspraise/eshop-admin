'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { OrdersWithProducts } from '@/app/admin/orders/types';
import { updateOrderStatus } from '@/actions/orders';

const statusOptions: string[] = ['pending', 'Shipped', 'inTransit', 'completed'];

type Props = {
  ordersWithProducts: OrdersWithProducts;
};

type OrderedProduct = {
  order_id: number;
  product: {
    category: number;
    created_at: string;
    heroImage: string;
    id: number;
    imagesUrl: string[];
    maxQuantity: number;
    price: number;
    slug: string | null;
    title: string;
  };
};

type OrderedProducts = OrderedProduct[];

export default function PageComponent({ ordersWithProducts }: Props) {
  const [selectedProducts, setSelectedProducts] = useState<OrderedProducts>([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState<Set<number>>(new Set());
  const [orders, setOrders] = useState(ordersWithProducts); // Local state for orders

  const openProductsModal = (products: OrderedProducts) => () => {
    setSelectedProducts(products);
  };

  const handleOutOfStockToggle = (productId: number) => {
    setOutOfStockProducts((prev) => {
      const updatedOutOfStock = new Set(prev);
      if (updatedOutOfStock.has(productId)) {
        updatedOutOfStock.delete(productId);
      } else {
        updatedOutOfStock.add(productId);
      }
      return updatedOutOfStock;
    });
  };

  const orderedProducts: OrderedProducts = orders.flatMap(order =>
    order.order_items.map(item => ({
      order_id: order.id,
      product: item.product,
    }))
  );

  const handleStatusChange = async (orderId: number, status: string) => {
    try {
      // Update the order status using the API
      await updateOrderStatus(orderId, status);

      // Update the local state of the order status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  useEffect(() => {
    // Recalculate refunded funds, remaining products, and adjusted total price when outOfStockProducts changes
  }, [outOfStockProducts]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Orders Management Dashboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Created_at</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Refunded Funds</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const filteredProducts = orderedProducts.filter(item => item.order_id === order.id);
            
            // Calculate refunded funds and remaining products based on outOfStockProducts
            const refundedFunds = filteredProducts.reduce((total, { product }) => {
              return outOfStockProducts.has(product.id) ? total + product.price : total;
            }, 0);

            // Calculate remaining products by filtering out the outOfStock products
            const remainingProducts = filteredProducts.filter(item => !outOfStockProducts.has(item.product.id)).length;

            // Adjusted total price reflects the removal of out-of-stock products' prices
            const adjustedTotalPrice = filteredProducts.reduce((total, { product }) => {
              return outOfStockProducts.has(product.id) ? total : total + product.price;
            }, 0);

            return (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{format(new Date(order.created_at), 'dd-MM-yyyy')}</TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value) => handleStatusChange(order.id, value)}
                    defaultValue={order.status}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue>{order.status}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{order.description || 'no Description'}</TableCell>
                <TableCell>{order.user.email}</TableCell>
                <TableCell>{order.slug}</TableCell>
                <TableCell>
                  {/* Adjusted Total Price reflecting out-of-stock adjustments */}
                  ${adjustedTotalPrice.toFixed(2)}
                </TableCell>
                <TableCell>{remainingProducts} item{remainingProducts > 1 ? 's' : ''}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={openProductsModal(filteredProducts)}
                      >
                        View Products
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Order Products</DialogTitle>
                      </DialogHeader>

                      <div className="mt-4">
                        {selectedProducts.map(({ product }, index) => (
                          <div key={index} className="mr-2 mb-2 flex items-center space-x-2">
                            <Image
                              className="w-16 h-16 object-cover rounded"
                              src={product.heroImage}
                              alt={product.title}
                              width={64}
                              height={64}
                            />
                            <div className="flex flex-col">
                              <span className="font-semibold">{product.title}</span>
                              <span className="text-gray-600">${product.price.toFixed(2)}</span>
                              <span className="text-gray-500">Available Quantity: {product.maxQuantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleOutOfStockToggle(product.id)}
                              >
                                {outOfStockProducts.has(product.id) ? 'Mark as In Stock' : 'Mark as Out of Stock'}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4">
                        <strong>Total Refunded Funds:</strong> ${refundedFunds.toFixed(2)}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  {/* Read-only Refunded Funds */}
                  ${refundedFunds.toFixed(2)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
