import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET semua data
export async function GET() {
    const expenses = await prisma.expense.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

    return Response.json(expenses);
}

// POST data pengeluaran baru
export async function POST(req: Request) {
    const body = await req.json();
    const { store, items, price, receiptDate, inputDate, inputTime } = body;

    try {
        const expense = await prisma.expense.create({
            data: {
                store,
                items,
                price,
                receiptDate: new Date(receiptDate),
                inputDate: new Date(inputDate),
                inputTime,
            },
        });

        return Response.json(expense);
    } catch (error) {
        console.error(error);
        return new Response("Terjadi kesalahan saat menyimpan data.", { status: 500 });
    }
}
