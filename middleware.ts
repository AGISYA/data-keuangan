import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// Middleware ini tidak membatasi akses apa pun
export function middleware() {
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // Middleware aktif di semua route
};
