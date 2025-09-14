"use client";

import { deleteEvent } from "@/lib/event-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EventActionProps {
  eventId: string;
}

export default function EventActions({ eventId }: EventActionProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  async function handleDelete() {
    if (
      !confirm(
        "Are you sure you want to delete this event? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      const result = await deleteEvent(eventId);
      if (result.success) {
        router.push("/dashboard");
      } else {
        alert("Failed to delete event: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("An error occured while deleting the event");
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <div className="flex gap-3">
      <button
        className="btn-secondary"
        onClick={() => router.push(`/events/${eventId}/edit`)}
      >
        Edit Event
      </button>
      <button
        className="btn-danger"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete Event"}
      </button>
    </div>
  );
}
