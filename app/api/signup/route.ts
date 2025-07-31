// app/api/signup/route.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json();
    const { email, password, name, phone, address, company } = body;

    if (!email || !password) {
        return new Response(JSON.stringify({ error: "Email and password required" }), {
            status: 400,
        });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        return new Response(JSON.stringify({ error: "Email already in use" }), {
            status: 400,
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name: name || "",
            phone: phone || "",
            address: address || "",
            company: company || "",
        },
    });

    return new Response(JSON.stringify({ success: true, userId: newUser.id }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
