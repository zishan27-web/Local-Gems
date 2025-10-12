import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
    try {
        const { username, email, password } = await request.json();
        const { db } = await connectToDatabase();

        if (!username || !email || !password) {
            throw new Error("Please enter username, email and password");
        }

        
        const existingUser = await db.collection('users').findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User with this email or username already exists.' }, { status: 409 });
        }
        
        const existingUsername = await db.collection('users').findOne({ username });
        if (existingUsername) {
            return NextResponse.json({ error: 'This username is already taken.' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.collection('users').insertOne({
            username,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        });
        return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred during registration.' }, { status: 500 });
    }
}