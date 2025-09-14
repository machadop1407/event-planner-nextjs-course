import { auth } from "@/auth";
import EventsList from "@/components/EventsList";
import Link from "next/link";

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; filter?: string }>;
}) {
  const session = await auth();
  const sp = await searchParams;

  const params = new URLSearchParams();
  if (sp.search) params.set("search", sp.search);
  if (sp.filter) params.set("filter", sp.filter);

  const eventsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/events?${params.toString()}`,
    { next: { tags: ["events"] } }
  );
  const events = eventsResponse.ok ? await eventsResponse.json() : [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events</h1>
          <p className="text-muted mt-2">
            Discover and join amazing events in your area
          </p>
        </div>
        {session && (
          <Link href="/events/create" className="btn-primary">
            Create Event
          </Link>
        )}
      </div>

      <EventsList
        events={events}
        searchParams={sp}
        isAuthenticated={!!session}
      />
    </div>
  );
}
