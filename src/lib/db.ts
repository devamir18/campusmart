import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI


if(!MONGODB_URI){
    throw new Error ("please define the MONGODB_URI ");

};


interface MongooseCached{
    conn: typeof mongoose | null ;
    promise: Promise<typeof mongoose> | null
}


declare global {
    var mongooseCache: MongooseCached | undefined;
}


const cached: MongooseCached = globalThis.mongooseCache ?? {
    conn:null,
    promise:null
}


globalThis.mongooseCache = cached



export async function connectDB () {
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI!,{
            bufferCommands:false
        })
    }


    cached.conn = await cached.promise;
    return cached.conn
}