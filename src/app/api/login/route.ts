// src/app/api/login/route.ts
import { dbConnect } from '@/lib/dbConnect';
import  Buyer  from '@/models/buyer';
import  Seller  from '@/models/seller';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password, userType } = await req.json();
  await dbConnect();

  let user;
  if (userType === 'buyer') {
    user = await Buyer.findOne({ email });
  } else if (userType === 'seller') {
    user = await Seller.findOne({ email });
  } else {
    return NextResponse.json({ message: 'Invalid user type' }, { status: 400 });
  }

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 400 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: 'Incorrect password' }, { status: 400 });
  }

  return NextResponse.json({ message: `${userType} login successful`, user });
}