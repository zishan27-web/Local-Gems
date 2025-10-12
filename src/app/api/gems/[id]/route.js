import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "bson";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }){
    try {
        const { id } = params;
        const { db } = await connectToDatabase();

        const result = await db.collection('gems').deleteOne({ _id: new ObjectId(id) });

        if(result.deletedCount === 0)
        {
            return NextResponse.json({ error: 'Gem not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Gem deleted successfully' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to delete gem' }, { status: 500 })
    }
}