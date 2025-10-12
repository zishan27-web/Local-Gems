import { connectToDatabase } from "@/lib/mongodb"
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import cloudinary from "@/lib/cloudinary";
import { resolve } from "styled-jsx/css";


export async function GET(request) {
    try {
        const { db } = await connectToDatabase();

        const gems = await db.collection('gems').find({}).toArray();

        return NextResponse.json({ gems }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to fetch gems" }, { status: 500 })
    }
}

export async function POST(request) {
    const session = await getServerSession(authOptions);
    // console.log(session);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // const { name, description, imageUrl, location} = await request.json();
        const data = await request.formData();

        const file = data.get('image');
        const name = data.get('name');
        const description = data.get('description');
        const location = data.get('location');

        if (!name || !description || !location) {
            return NextResponse.json({ error: 'Required fields are missing.' }, { status: 400 });
        }

        let imageUrl = null;
        if(file)
        {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const response = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({}, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
                uploadStream.end(buffer);
            })
            imageUrl = response.secure_url;
        }

        const { db } = await connectToDatabase();
        const newGem = {
            name,
            description,
            imageUrl,
            location,
            submittedBy: session.user.username,
            createdAt: new Date(),
        }
        const result = await db.collection('gems').insertOne(newGem);

        const createdGem = {
            ...newGem,
            _id: result.insertedId,
        }

        return NextResponse.json(createdGem, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create gem' }, { status: 500 });
    }
}