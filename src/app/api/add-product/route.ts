// src/app/api/add-product/route.ts
import { dbConnect } from '@/lib/dbConnect';
import  Product  from '@/models/product';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';
import multer from 'multer';
// import { nextConnect } from 'next-connect';

// Helper to convert stream to buffer
async function streamToBuffer(readable: Readable) {
  const chunks: Uint8Array[] = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const sellerId = formData.get('sellerId')?.toString() || '';
  const productName = formData.get('productName')?.toString() || '';
  const description = formData.get('description')?.toString() || '';
  const price = Number(formData.get('price'));
  const quantity = Number(formData.get('quantity'));
  const category = formData.get('category')?.toString() || '';
  const tags = JSON.parse(formData.get('tags')?.toString() || '[]');
  const artisan = formData.get('artisan')?.toString() || '';
  const tribe = formData.get('tribe')?.toString() || '';
  const region = formData.get('region')?.toString() || '';
  const material = formData.get('material')?.toString() || '';

  const file = formData.get('image') as File;
  const buffer = await file.arrayBuffer();
  const base64Image = Buffer.from(buffer).toString('base64');

  await dbConnect();

  const newProduct = new Product({
    sellerId,
    productName,
    description,
    price,
    quantity,
    category,
    tags,
    artisan,
    tribe,
    region,
    material,
    imageUrl: `data:${file.type};base64,${base64Image}`
  });

  await newProduct.save();
  return NextResponse.json({ message: 'Product added successfully' }, { status: 201 });
}