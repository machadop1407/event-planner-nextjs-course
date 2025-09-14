import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    const userEvents = await prisma.event.findMany({
      where: { userId: session?.user?.id },
      include: {
        _count: {
          select: { rsvps: true },
        },
      },
      orderBy: { date: "asc" },
    });

    return NextResponse.json(userEvents);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch user events" },
      { status: 500 }
    );
  }
}
