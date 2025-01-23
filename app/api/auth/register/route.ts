import { db } from "@/lib/db";
import { signUpSchema } from "@/schema/signUpSchema";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    const body: unknown = await request.json();
    const result = signUpSchema.safeParse(body);
    if(!result.success){
        return NextResponse.json("Missing fields__route.ts_api_register", {
            status: 203
        });
    }
    const {email, password, username} = result.data; 
    try {
        const existedUsername = await db.user.findUnique({
            where:{
                username,
            }
        })
        
        if(existedUsername) return NextResponse.json("Username already exists__route_api_register", {
            status:202
        })


        const existedEmail = await db.user.findUnique({
            where:{
                email,
            }
        })
        if(existedEmail) return NextResponse.json("Email already exists__route_api_register", {
            status:202,
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data:{
                email,
                username,
                hashedPassword
            }
        });
        // user created after all the checks.
        return NextResponse.json(user, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json("Internal server error__route_api_register", {
            status: 204
        })
    }

}