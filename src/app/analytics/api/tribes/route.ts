// // src/app/api/tribes/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/analy/mongodb';
import mongoose from 'mongoose';

const analySchema = new mongoose.Schema({}, { strict: false });
const Analy = mongoose.models.Analy || mongoose.model('Analy', analySchema, 'analy');

export async function GET() {
  try {
    await dbConnect();
    const data = await Analy.find({});
    return NextResponse.json(data);
  } catch (error) {
    console.error('API /api/tribes error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
