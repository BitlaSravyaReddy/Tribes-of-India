
// src/app/api/tribes/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/analy/mongodb';
import mongoose from 'mongoose';

const tribeSchema = new mongoose.Schema({}, { strict: false });
const Tribe = mongoose.models.Tribe || mongoose.model('Tribe', tribeSchema, 'analy');

export async function GET(req: Request) {
  try {
    await dbConnect();
    const tribes = await Tribe.find({});
    return NextResponse.json(tribes);
  } catch (error) {
    console.error('API /api/tribes error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
