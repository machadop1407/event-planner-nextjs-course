"use client";

import { Event } from "@/lib/models";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface EventsListProps {
  events: Event[];
  searchParams: { search?: string; filter?: string };
  isAuthenticated: boolean;
}

export default function EventsList({
  events,
  searchParams,
  isAuthenticated,
}: EventsListProps) {
  const router = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    const filter = formData.get("filter") as string;

    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (filter) params.set("filter", filter);

    router.push(`/events?${params.toString()}`);
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="card p-6">
        <form onSubmit={handleSearch} className="flex gap-4 flex-wrap">
          <div className="flex-1 mn-w-64">
            <input
              type="text"
              name="search"
              placeholder="Search events..."
              className="input-field"
              defaultValue={searchParams.search}
            />
          </div>
          <select
            name="filter"
            className="input-field w-auto"
            defaultValue={searchParams.filter}
          >
            <option value="">All Events</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>
          <button type="submit" className="btn-primary">
            Filter
          </button>
        </form>
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted text-lg">No events found.</p>
          {isAuthenticated && (
            <Link
              href={"/events/create"}
              className="btn-primary mt-4 inline-block"
            >
              Create the first event
            </Link>
          )}
        </div>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, key) => (
          <div
            key={key}
            className="card overflow-hidden hover:shadow-lg tansition-shadow"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {event.title}
              </h3>
              <p className="text-muted mb-4">{event.description}</p>
              <div className="space-y-2 text-sm text-muted">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {format(new Date(event.date), "PPP 'at' p")}
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {event.location}
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {event.maxAttendees}
                </div>

                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  by {event.user.name || "Unknown"}
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href={`/events/${event.id}`}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
