import Link from "next/link";
import { auth } from "../auth";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold text-foreground mb-6">
          Plan Your Perfect Event
        </h1>
        <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
          Create, manage, and join amazing events. From meetups to conferences,
          we&apos;ve got everything you need to make your event a success.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {session ? (
            <>
              <Link
                href="/events/create"
                className="btn-primary text-lg px-8 py-3"
              >
                Create Event
              </Link>
              <Link href="/events" className="btn-secondary text-lg px-8 py-3">
                Browse Events
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-primary text-lg px-8 py-3">
                Get Started with GitHub
              </Link>
              <Link href="/events" className="btn-secondary text-lg px-8 py-3">
                Browse Events
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Create Events
          </h3>
          <p className="text-muted">
            Easily create and manage your events with our intuitive interface.
          </p>
        </div>

        <div className="text-center">
          <div className="bg-secondary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            RSVP System
          </h3>
          <p className="text-muted">
            Let attendees RSVP to your events and track attendance easily.
          </p>
        </div>

        <div className="text-center">
          <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Analytics
          </h3>
          <p className="text-muted">
            Track your event performance and attendee engagement.
          </p>
        </div>
      </section>
    </div>
  );
}
