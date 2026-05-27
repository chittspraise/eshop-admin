'use server';

import slugify from 'slugify';

import { createClient } from '@/supabase/server';
import {
  ProductsWithCategoriesResponse,
  UpdateProductSchema,
} from '@/app/admin/products/products.types';
import { CreateProductSchemaServer } from '@/app/admin/products/schema';
import { revalidatePath } from 'next/cache';
import { ADMIN } from '@/constants/constants';

const checkAdmin = async () => {
  const supabase = await createClient();
  const { data: authData } = await supabase.auth.getUser();
  if (!authData.user) {
    throw new Error('You must be logged in to perform this action');
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('type')
    .eq('id', authData.user.id)
    .single();

  if (userError || userData?.type?.toUpperCase() !== ADMIN) {
    throw new Error('Access denied: Only admins can perform this action');
  }
};

export const getProductsWithCategories =
  async (): Promise<ProductsWithCategoriesResponse> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('product')
      .select('*, category:category(*)')
      .returns<ProductsWithCategoriesResponse>();

    if (error) {
      throw new Error(`
        Error fetching products with categories: ${error.message}`);
    }

    return data || [];
  };

  export const updateProductStatus = async (productId: number, Status: string) => {
    await checkAdmin();
    const supabase = await createClient();
    const { error } = await supabase
      .from('product')
      .update({ Status })
      .eq('id', productId);
  
    if (error) throw new Error(error.message);
  };
  

export const createProduct = async ({
  category,
  heroImage,
  images,
  price,
  description, // Added description field
  title,
}: CreateProductSchemaServer) => {
  await checkAdmin();
  const supabase = await createClient();
  const slug = slugify(title, { lower: true });

  const { data, error } = await supabase.from('product').insert({
    category,
    heroImage,
    imagesUrl: images,
    price,
    maxQuantity: 99999, // Added to satisfy DB NOT NULL constraint since the logic is removed from the app
    description, // Include description field
    slug,
    title,
  });

  if (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }

  revalidatePath('/admin/products');

  return data;
};

export const updateProduct = async ({
  category,
  heroImage,
  imagesUrl,
  price,
  description, // Added description field
  slug,
  title,
}: UpdateProductSchema) => {
  await checkAdmin();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('product')
    .update({
      category,
      heroImage,
      imagesUrl,
      price,
      description, // Include description field
      title,
    })
    .match({ slug });

  if (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }

  revalidatePath('/admin/products');

  return data;
};

export const deleteProduct = async (slug: string) => {
  await checkAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from('product').delete().match({ slug });

  if (error) {
    throw new Error(`Error deleting product: ${error.message}`);
  }

  revalidatePath('/admin/products');
};
