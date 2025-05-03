'use client';

import { useState } from 'react';
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
import {
  updateOrderItemStatus,
  updateOrderStatus,
  updateFinancials,
} from '@/actions/orders';
import { updateProductStatus } from '@/actions/products';

const statusOptions = ['Pending', 'Shipped', 'InTransit', 'Completed'];

export type Product = {
  id: number;
  title: string;
  heroImage: string;
  price: number;
  slug: string | null;
  imagesUrl: string[];
  Status: string | null;
  created_at: string;
  category: number;
  is_out_of_stock: boolean;
};

export type OrderedProduct = {
  order_id: number;
  order_item_id: number;
  status: string | null;
  product: Product | null;
};

export type OrderedProducts = OrderedProduct[];

export default function PageComponent({
  ordersWithProducts,
}: {
  ordersWithProducts: OrdersWithProducts;
}) {
  const [selectedProducts, setSelectedProducts] = useState<OrderedProducts>([]);
  const [allOrderedProducts, setAllOrderedProducts] = useState<OrderedProducts>(() =>
    ordersWithProducts.flatMap(order =>
      order.order_items.map(item => ({
        order_id: order.id,
        order_item_id: item.id,
        status: item.status,
        product: item.product, // ensure product is not null in your backend or handle it here
      }))
    )
  );

  const openProductsModal = (products: OrderedProducts) => () =>
    setSelectedProducts(products);

  const handleStatusChange = async (orderId: number, status: string) => {
    await updateOrderStatus(orderId, status);
  };

  // Calculate refund only for items that have been explicitly marked as "out of stock"
  const calculateRefund = (orderItems: OrderedProduct[]) => {
    return orderItems
      .filter(
        item =>
          item.status === 'out of stock' &&
          item.product !== null &&
          typeof item.product.price === 'number'
      )
      .reduce((acc, item) => acc + item.product!.price, 0);
  };

  // Calculate the total of items that are in stock
  const calculateInStockTotal = (orderItems: OrderedProduct[]) => {
    return orderItems
      .filter(
        item =>
          item.status !== 'out of stock' &&
          item.product !== null &&
          typeof item.product.price === 'number'
      )
      .reduce((acc, item) => acc + item.product!.price, 0);
  };

  // Count items that are in stock
  const calculateInStockCount = (orderItems: OrderedProduct[]) => {
    return orderItems.filter(
      item => item.status !== 'out of stock' && item.product !== null
    ).length;
  };

  const updateOrderFinancials = async (
    orderId: number,
    orderItems: OrderedProduct[]
  ) => {
    // Only recalculate financials when a change occurs (e.g. marking out of stock)
    const adjustedTotalPrice = calculateInStockTotal(orderItems);
    const refund = calculateRefund(orderItems);

    try {
      await updateFinancials(orderId, adjustedTotalPrice, refund);
      console.log('Order financials updated successfully.');
    } catch (error) {
      console.error('Error updating order financials:', error);
    }
  };

  const handleUpdateStatus = async (
    orderItemId: number,
    productId: number,
    newStatus: string
  ) => {
    try {
      await updateProductStatus(productId, newStatus);
      await updateOrderItemStatus(orderItemId, newStatus);

      const updatedAll = allOrderedProducts.map(item =>
        item.order_item_id === orderItemId
          ? {
              ...item,
              status: newStatus,
              product: item.product
                ? { ...item.product, Status: newStatus }
                : null,
            }
          : item
      );

      const updatedSelected = selectedProducts.map(item =>
        item.order_item_id === orderItemId
          ? {
              ...item,
              status: newStatus,
              product: item.product
                ? { ...item.product, Status: newStatus }
                : null,
            }
          : item
      );

      setAllOrderedProducts(updatedAll);
      setSelectedProducts(updatedSelected);

      const updatedItem = updatedAll.find(item => item.order_item_id === orderItemId);
      if (updatedItem) {
        const orderId = updatedItem.order_id;
        const relatedItems = updatedAll.filter(item => item.order_id === orderId);
        await updateOrderFinancials(orderId, relatedItems);
      }
    } catch (error) {
      console.error('Error updating statuses:', error);
    }
  };

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-6'>Orders Management Dashboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Refund</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersWithProducts.map(order => {
            const orderItems = allOrderedProducts.filter(
              item => item.order_id === order.id
            );
            const refund = calculateRefund(orderItems);
            const inStockTotal = calculateInStockTotal(orderItems);
            const inStockCount = calculateInStockCount(orderItems);

            return (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {format(new Date(order.created_at), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>
                  <Select
                    onValueChange={value => handleStatusChange(order.id, value)}
                    defaultValue={order.status}
                  >
                    <SelectTrigger className='w-[120px]'>
                      <SelectValue>{order.status}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(status => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{order.description || 'No Description'}</TableCell>
                <TableCell>{order.user.email}</TableCell>
                <TableCell>{order.slug}</TableCell>
                <TableCell>R {inStockTotal.toFixed(2)}</TableCell>
                <TableCell>R {refund.toFixed(2)}</TableCell>
                <TableCell>
                  {inStockCount} item{inStockCount !== 1 ? 's' : ''}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={openProductsModal(orderItems)}
                      >
                        View Products
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Order Products</DialogTitle>
                      </DialogHeader>
                      <div className='mt-4'>
                        {selectedProducts.map(
                          ({ product, order_item_id, status }) =>
                            product && (
                              <div
                                key={order_item_id}
                                className='mr-2 mb-4 flex items-center space-x-4'
                              >
                                <Image
                                  className='w-16 h-16 object-cover rounded'
                                  src={product.heroImage}
                                  alt={product.title}
                                  width={64}
                                  height={64}
                                />
                                <div className='flex flex-col'>
                                  <span className='font-semibold'>
                                    {product.title}
                                  </span>
                                  <span className='text-gray-600'>
                                    R {product.price.toFixed(2)}
                                  </span>
                                  <div className='flex space-x-2 mt-2'>
                                    <Button
                                      variant={
                                        status === 'out of stock'
                                          ? 'default'
                                          : 'destructive'
                                      }
                                      size='sm'
                                      onClick={() =>
                                        handleUpdateStatus(
                                          order_item_id,
                                          product.id,
                                          status === 'out of stock'
                                            ? 'in stock'
                                            : 'out of stock'
                                        )
                                      }
                                    >
                                      {status === 'out of stock'
                                        ? 'Mark In Stock'
                                        : 'Mark Out of Stock'}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
