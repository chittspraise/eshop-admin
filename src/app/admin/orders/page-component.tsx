"use client";
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const statusOptions: string[] = ['pending', 'Shipped', 'inTransit', 'completed'];

type Props = {
  ordersWithProducts: OrdersWithProducts;
};

type OrderedProduct = {
  order_item_id: number;
  order_id: number;
  product: {
    category: number;
    created_at: string;
    heroImage: string;
    id: number;
    imagesUrl: string[];
    description: string | null;
    price: number;
    slug: string | null;
    title: string;
    is_out_of_stock?: boolean;
  };
  is_out_of_stock?: boolean;
  quantity: number; // Added quantity property
  unique_instance_id?: string; // Added unique_instance_id property
  // Added unique_instance_id property
};

export default function PageComponent({ ordersWithProducts }: Props) {
  // Initialize state with orders from props then fetch latest data from DB.
  const [orders, setOrders] = useState(ordersWithProducts);
  const [selectedProducts, setSelectedProducts] = useState<OrderedProduct[]>([]);
  // Use a Set of order_item IDs that are marked as out of stock.
  const [outOfStockInstances, setOutOfStockInstances] = useState<Set<number>>(new Set());

  // Fetch persisted out-of-stock instances from the DB on mount.
  useEffect(() => {
    const fetchOutOfStockInstances = async () => {
      try {
        const { data, error } = await supabase
          .from('order_item')
          .select('id, is_out_of_stock')
          .eq('is_out_of_stock', true);
        if (error || !data) return;
        const instanceKeys = data.map((item) => item.id);
        setOutOfStockInstances(new Set(instanceKeys));
      } catch {
        // Error silently handled.
      }
    };

    fetchOutOfStockInstances();
  }, []);

  // Fetch the latest orders from the DB on mount.
  useEffect(() => {
    const fetchOrdersFromDB = async () => {
      try {
        // Fetch orders sorted by created_at descending (recent orders first)
        // and include order_items and the associated product data.
        const { data, error } = await supabase
          .from('order')
          .select('*, order_items(*, product(*))')
          .order('created_at', { ascending: false });
        if (error || !data) return;
        setOrders(data);
      } catch {
        // Error silently handled.
      }
    };

    fetchOrdersFromDB();
  }, []);

  // Open modal with the given products.
  const openProductsModal = (products: OrderedProduct[]) => () => {
    setSelectedProducts(products);
  };

<<<<<<< HEAD
  const handleOutOfStockToggle = async (orderId: number, productId: number, orderStatus: string) => {
    if (orderStatus === 'pending') {
      try {
        const updated = new Set(outOfStockProducts);

        if (updated.has(productId)) {
          updated.delete(productId);
          await updateProductStatus(productId, 'in stock');
        } else {
          updated.add(productId);
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
=======
  // Update order_item in the database using the unique order_item id.
  const updateOrderItemStatus = async (instance: OrderedProduct, isOutOfStock: boolean) => {
>>>>>>> 7ec8ae9 (links)
    try {
      await supabase
        .from('order_item')
        .update({ is_out_of_stock: isOutOfStock })
        .eq('id', instance.order_item_id);
    } catch {
      // Error silently handled.
    }
  };

  // Update product status in the database.
  const updateProductStatus = async (productId: number, isOutOfStock: boolean) => {
    const statusString = isOutOfStock ? 'out of stock' : 'in stock';
    try {
      await supabase
        .from('product')
        .update({ Status: statusString })
        .eq('id', productId);
    } catch {
      // Error silently handled.
    }
  };

  // Toggle the out-of-stock state for a product instance.
  const handleOutOfStockToggle = async (instance: OrderedProduct, orderStatus: string) => {
    if (orderStatus !== 'pending') return;
    const instanceId = instance.order_item_id;
    const isNowOutOfStock = !outOfStockInstances.has(instanceId);

    setOutOfStockInstances((prev) => {
      const updated = new Set(prev);
      if (isNowOutOfStock) {
        updated.add(instanceId);
      } else {
        updated.delete(instanceId);
      }
      return updated;
    });

    await updateOrderItemStatus(instance, isNowOutOfStock);
    await updateProductStatus(instance.product.id, isNowOutOfStock);
  };

  // Handle status change for an order.
  const handleStatusChange = async (orderId: number, status: string) => {
    try {
      await updateOrderStatus(orderId, status);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch {
      // Error silently handled.
    }
  };

  // Update order totals based on current outOfStockInstances.
  useEffect(() => {
    const updateOrderTotals = async () => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          // Instead of flattening quantity, we map each order_item row to one instance.
            const filteredProducts: OrderedProduct[] = Array.isArray(order.order_items)
            ? order.order_items.flatMap((item) =>
              Array.from({ length: item.quantity || 1 }, () => ({
              order_item_id: item.id, // Use the numeric ID directly
              order_id: order.id,
              product: item.product,
              is_out_of_stock:
                outOfStockInstances.has(item.id) ||
                item.product.is_out_of_stock,
              quantity: 1, // Treat each instance as a single unit
              }))
              )
            : [];

          const totalPrice = filteredProducts.reduce(
            (total, instance) =>
              total + (instance.is_out_of_stock ? 0 : instance.product.price),
            0
          );

          const refunded_amount = filteredProducts.reduce(
            (total, instance) =>
              total + (instance.is_out_of_stock ? instance.product.price : 0),
            0
          );

          // Update the totals in the database without logging.
          (async () => {
            try {
              await supabase
                .from('order')
                .update({ totalPrice, refunded_amount })
                .eq('id', order.id);
            } catch {
              // Error silently handled.
            }
          })();

          return {
            ...order,
            totalPrice,
            refunded_amount,
          };
        })
      );
    };

    updateOrderTotals();
  }, [outOfStockInstances]);

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
            const filteredProducts: OrderedProduct[] = Array.isArray(order.order_items)
              ? order.order_items.flatMap((item) =>
                Array.from({ length: item.quantity || 1 }, (_, index) => ({
                order_item_id: item.id,
                order_id: order.id,
                product: item.product,
                is_out_of_stock:
                  outOfStockInstances.has(item.id) ||
                  item.product.is_out_of_stock,
                quantity: 1, // Treat each instance as a single unit
                unique_instance_id: `${item.id}-${index}`, // Unique identifier for each instance
                }))
              )
              : [];

<<<<<<< HEAD
    // Recalculate refunded funds and total price based on out-of-stock status
    const refundedFunds = filteredProducts.reduce((total, { product }) => {
      // If product is out of stock, add its price to refunded funds
      if (outOfStockProducts.has(product.id)) {
        return total + product.price;
      }
      return total; 
    }, 0);
=======
            const remainingProducts = filteredProducts.reduce(
              (total, instance) =>
              total + (!instance.is_out_of_stock ? instance.quantity : 0),
              0
            );
>>>>>>> 7ec8ae9 (links)

            const refundedFunds = filteredProducts.reduce(
              (total, instance) =>
              total +
              (instance.is_out_of_stock
                ? instance.product.price * instance.quantity
                : 0),
              0
            );

<<<<<<< HEAD
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
=======
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
              <TableCell>{order.description || 'No Description'}</TableCell>
              <TableCell>{order.user ? order.user.email : 'No Email'}</TableCell>
              <TableCell>{order.slug}</TableCell>
              <TableCell>R{order.totalPrice?.toFixed(2) || '0.00'}</TableCell>
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
>>>>>>> 7ec8ae9 (links)
                  >
                  View Products
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                  <DialogTitle>Order Products</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                  {selectedProducts.map((instance) => (
                    <div
                    key={instance.unique_instance_id}
                    className="mr-2 mb-2 flex items-center space-x-2"
                    >
                    <Image
                      className="w-16 h-16 object-cover rounded"
                      src={instance.product.heroImage}
                      alt={instance.product.title}
                      width={64}
                      height={64}
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold">{instance.product.title}</span>
                      <span className="text-sm text-gray-600">
                      R{instance.product.price} x {instance.quantity}
                      </span>
                    </div>
                    <Button
<<<<<<< HEAD
               variant="outline"
              size="sm"
              onClick={() => handleOutOfStockToggle(order.id, product.id, order.status)}
              disabled={order.status !== 'pending'}
              >
     {outOfStockProducts.has(product.id) ? 'Mark In Stock' : 'Mark Out of Stock'}
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

=======
                      variant="outline"
                      size="sm"
                      onClick={() =>
                      handleOutOfStockToggle(instance, order.status)
                      }
                      disabled={order.status !== 'pending'}
                    >
                      {outOfStockInstances.has(instance.order_item_id)
                      ? 'Mark In Stock'
                      : 'Mark Out of Stock'}
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
>>>>>>> 7ec8ae9 (links)
      </Table>
    </div>
  );
}