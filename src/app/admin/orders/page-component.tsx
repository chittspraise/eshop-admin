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
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with environment variables
const supabaseUrl = 'https://nlwtuqszbnuvrmhjcbcp.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sd3R1cXN6Ym51dnJtaGpjYmNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMjg1MzcsImV4cCI6MjA0NzgwNDUzN30.EVnrm6YinT_uhTHuF5CAOmhVN9t6doWw6bYPxax6WzI';
const supabase = createClient(supabaseUrl, supabaseKey);

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
  const [orders, setOrders] = useState(ordersWithProducts);
  const [selectedProducts, setSelectedProducts] = useState<OrderedProducts>([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState<Set<string>>(new Set());

  // Fetch out-of-stock status from the database on component mount
  useEffect(() => {
    const fetchOutOfStockStatus = async () => {
      try {
        // Fetch all products marked as out of stock
        const { data, error } = await supabase
          .from('product')
          .select('id')
          .eq('Status', 'out of stock');

        if (error) {
          console.error('Error fetching out of stock products:', error.message);
        } else {
          const outOfStockSet = new Set(data.map((product: { id: number }) => product.id));
          setOutOfStockProducts(outOfStockSet);
        }
      } catch (error) {
        console.error('Error fetching out of stock products:', error);
      }
    };

    fetchOutOfStockStatus();
  }, []);

  const openProductsModal = (products: OrderedProducts) => () => {
    setSelectedProducts(products);
  };

  const handleOutOfStockToggle = async (orderId: number, productId: number, orderStatus: string) => {
    if (orderStatus === 'pending') {
      try {
        const key = `${orderId}_${productId}`; // Unique key for each product in an order
        const updated = new Set(outOfStockProducts);
  
        if (updated.has(key)) {
          updated.delete(key);
          await updateProductStatus(productId, 'in stock');
        } else {
          updated.add(key);
          await updateProductStatus(productId, 'out of stock');
        }
  
        setOutOfStockProducts(new Set(updated)); // Update state with new Set
  
      } catch (error) {
        console.error('Error updating product status:', error);
      }
    } else {
      console.log('Stock status cannot be changed for completed or non-pending orders.');
    }
  };
  
  const updateProductStatus = async (productId: number, Status: string) => {
    try {
      const { error } = await supabase
        .from('product')
        .update({ Status: Status })
        .eq('id', productId);
      
      if (error) {
        console.error(`Error updating product status for ${productId}:`, error.message);
      } else {
        console.log(`Product ${productId} status updated to ${Status}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error updating product status for ${productId}:`, error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  };

  const handleStatusChange = async (orderId: number, status: string) => {
    try {
      await updateOrderStatus(orderId, status);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const updateOrderAmounts = async (
    orderId: number,
    refundedAmount: number,
    totalPrice: number
  ) => {
    try {
      const { data, error } = await supabase
        .from('order') // Ensure this table name is correct.
        .update({ refunded_amount: refundedAmount, totalPrice: totalPrice })
        .eq('id', orderId);
      if (error) {
        console.error(`Error updating order ${orderId}:`, error.message);
      } else {
        console.log(`Order ${orderId} updated:`, data);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error updating order ${orderId}:`, error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    const updateOrdersInDB = async () => {
      setOrders((prevOrders) => {
        return prevOrders.map((order) => {
          const products = order.order_items.map((item) => item.product);
          const refundedFunds = products.reduce((total, product) => {
            return outOfStockProducts.has(product.id)
              ? total + product.price
              : total;
          }, 0);
          const adjustedTotalPrice = products.reduce((total, product) => {
            return outOfStockProducts.has(product.id)
              ? total
              : total + product.price;
          }, 0);

          if (
            order.refunded_amount !== refundedFunds ||
            order.totalPrice !== adjustedTotalPrice
          ) {
            updateOrderAmounts(order.id, refundedFunds, adjustedTotalPrice);
            return {
              ...order,
              refunded_amount: refundedFunds,
              totalPrice: adjustedTotalPrice,
            };
          }
          return order;
        });
      });
    };

    updateOrdersInDB();
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
            <TableHead>Refunded Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
  {orders.map((order) => {
    const filteredProducts = order.order_items.flatMap((item) => {
      // Create multiple entries for each quantity of the product
      return Array.from({ length: item.quantity }, () => ({
        order_id: order.id,
        product: item.product,
      }));
    });

    // Recalculate refunded funds and total price based on out-of-stock status
    const refundedFunds = filteredProducts.reduce((total, { product }) => {
      // If product is out of stock, add its price to refunded funds
      if (outOfStockProducts.has(product.id)) {
        return total + product.price;
      }
      return total; 
    }, 0);

    const remainingProducts = filteredProducts.filter(
      (item) => !outOfStockProducts.has(item.product.id)
    ).length;

    const totalPrice = filteredProducts.reduce((total, { product }) => {
      // Recalculate the total price based on stock availability
      if (!outOfStockProducts.has(product.id)) {
        return total + product.price;
      }
      return total;
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
        <TableCell>{order.user ? order.user.email : 'No Email'}</TableCell>
        <TableCell>{order.slug}</TableCell>
        <TableCell>R{totalPrice.toFixed(2) || '0.00'}</TableCell>
        <TableCell>
          {remainingProducts} item{remainingProducts > 1 ? 's' : ''}
        </TableCell>
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
                  <div
                    key={index}
                    className="mr-2 mb-2 flex items-center space-x-2"
                  >
                    <Image
                      className="w-16 h-16 object-cover rounded"
                      src={product.heroImage}
                      alt={product.title}
                      width={64}
                      height={64}
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">{product.title}</span>
                      <span className="text-sm text-gray-600">{product.price}</span>
                    </div>
                    <Button
               variant="outline"
              size="sm"
              onClick={() => handleOutOfStockToggle(order.id, product.id, order.status)}
              disabled={order.status !== 'pending'}
              >
     {outOfStockProducts.has(`${order.id}_${product.id}`) ? 'Mark In Stock' : 'Mark Out of Stock'}
</Button>

                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </TableCell>
        <TableCell>R{refundedFunds.toFixed(2)}</TableCell>
      </TableRow>
    );
  })}
</TableBody>

      </Table>
    </div>
  );
}