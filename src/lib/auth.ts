import { SignJWT, jwtVerify} from "jose";
import bcryptjs from "bcryptjs";
import bcrypt from "bcryptjs";
import { string } from "zod";


const getJwtSecrete = () => {
    const secrete = process.env.JWT_SECRETE

    if(!secrete){
        throw new Error("JWT_SECRETE missing in the .env.local")
        return new TextEncoder().encode(secrete)
    }
}


export async function hashPassword(password:string):Promise<string>{
    return bcryptjs.hash(password,12)
}


export async function VerifyPassword(
    password: string,
    hashedpassword: string
):Promise<boolean>{
    return bcryptjs.compare(password,hashPassword)
}


export interface  SessionPayload {
    userId:string ;
    role:"buyer" | "seller" | "admin"
}


export async function SignSessionToken(payload:SessionPayload):Promise<string>{
    return new SignJWT({ ...payload})
    .setProtectedHeader({alg:"H256"})
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getJwtSecrete());
}


export async function verifySessionToken(
    token:string
):Promise <SessionPayload | null>{
    try{
        const {payload} = await jwtVerify(token, getJwtSecrete())
        return payload as unknown as SessoinnPaylaod;
    } catch {
        return null
    }
}