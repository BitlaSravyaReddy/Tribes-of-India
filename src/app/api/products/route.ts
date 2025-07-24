// src/app/api/products/route.ts
import { dbConnect } from '@/lib/dbConnect';
import  Product  from '@/models/product';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sellerId = searchParams.get('sellerId');
  await dbConnect();
  const products = await Product.find({ sellerId });
  return NextResponse.json({ products });
}
