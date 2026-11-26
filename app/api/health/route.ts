import { NextResponse } from "next/server";
import { connectDB } from "@/src/lib/db";
import { error } from "console";


export async function GET () {
    try{
        await connectDB();
        return NextResponse.json({ok: true, db:"connected"}, {status:200})
    } catch (error) {
        console.error("Database connection error:", error)
        return NextResponse.json({ok:false, db:"Disconnected"}, {status:500})
    }

}