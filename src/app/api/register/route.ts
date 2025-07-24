// src/app/api/register/route.ts
import { dbConnect } from '@/lib/dbConnect';
import  Buyer  from '@/models/buyer';
import  Seller  from '@/models/seller';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, email, password, userType } = await req.json();
  await dbConnect();
  const hashedPassword = await bcrypt.hash(password, 10);

  if (userType === 'buyer') {
    const existingBuyer = await Buyer.findOne({ email });
    if (existingBuyer) {
      return NextResponse.json({ message: 'Email already registered as Buyer' }, { status: 400 });
    }
    const newBuyer = new Buyer({ username, email, password: hashedPassword });
    await newBuyer.save();
    return NextResponse.json({ message: 'Buyer registered successfully' }, { status: 201 });
  } else if (userType === 'seller') {
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return NextResponse.json({ message: 'Email already registered as Seller' }, { status: 400 });
    }
    const newSeller = new Seller({ username, email, password: hashedPassword });
    await newSeller.save();
    return NextResponse.json({ message: 'Seller registered successfully' }, { status: 201 });
  } else {
    return NextResponse.json({ message: 'Invalid user type' }, { status: 400 });
  }
}