// src/app/api/data/route.ts
import { dbConnect } from '@/lib/dbConnect';
import MainDocument from '@/models/MainDocument';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  const mainDocument = await MainDocument.findOne();
  if (!mainDocument) {
    return NextResponse.json({ message: 'No data found' }, { status: 404 });
  }
  const { _id, ...stateData } = mainDocument.toObject();
  return NextResponse.json(stateData);
}