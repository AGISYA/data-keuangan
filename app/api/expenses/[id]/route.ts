import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

// PATCH (update)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const body = await req.json();
        const { store, items, price, receiptDate, inputDate, inputTime } = body;

        const updatedExpense = await prisma.expense.update({
            where: { id },
            data: {
                store,
                items,
                price,
                receiptDate: new Date(receiptDate),
                inputDate: new Date(inputDate),
                inputTime,
            },
        });

        return new Response(JSON.stringify(updatedExpense), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("PATCH error:", error);
        return new Response("Gagal mengubah data.", { status: 500 });
    }
}

// DELETE
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        await prisma.expense.delete({
            where: { id },
        });

        return new Response("Data berhasil dihapus.", { status: 200 });
    } catch (error) {
        console.error("DELETE error:", error);
        return new Response("Gagal menghapus data.", { status: 500 });
    }
}
