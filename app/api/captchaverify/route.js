import { NextResponse } from "next/server";


export async function POST(req) {
    const body = await req.json();
    const token = body.token
    if (!token) {
        return NextResponse.json({ message: "no token given" });
    }
    try {
        const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                secret: process.env.SECRET_KEY,
                response: token,
            }),
        });
        const data = await res.json();

        return NextResponse.json({ data,token })
    } catch (error) {
        return NextResponse.json({ error })
    }
}