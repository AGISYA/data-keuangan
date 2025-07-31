import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) return Response.json({ error: "userId diperlukan" }, { status: 400 });

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            name: true,
            email: true,
            phone: true,
            address: true,
            company: true,
        },
    });

    return Response.json(user);
}

export async function PUT(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) return Response.json({ error: "userId diperlukan" }, { status: 400 });

    const body = await req.json();

    const updated = await prisma.user.update({
        where: { id: userId },
        data: {
            name: body.name,
            email: body.email,
            phone: body.phone,
            address: body.address,
            company: body.company,
        },
    });

    return Response.json({ success: true });
}
