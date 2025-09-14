import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  {
    params,
  }: {
    params: Promise<{ eventId: string }>;
  }
) {
  try {
    const { eventId } = await params;

    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        user: { select: { name: true, email: true } },
        rsvps: {
          include: {
            user: {
              select: { name: true, email: true },
            },
          },
        },
        _count: {
          select: { rsvps: true },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event Not Found" }, { status: 404 });
    }

    const session = await auth();

    if (!event.isPublic && event.userId !== session?.user?.id) {
      return NextResponse.json(
        { error: "Not authorized to view this event" },
        { status: 403 }
      );
    }

    return NextResponse.json(event);
  } catch (err) {
    console.error("error fetching event: ", err);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}
