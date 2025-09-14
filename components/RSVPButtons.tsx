"use client";

import { rsvpToEvent } from "@/lib/event-actions";
import { RSVPStatus } from "@/lib/models";
import { RVSPStatus } from "@prisma/client";
import { useState } from "react";

interface RSVPButtonsProps {
  eventId: string;
  currentRSVP?: RSVPStatus;
}

export default function RSVPButtons({
  eventId,
  currentRSVP,
}: RSVPButtonsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function getButtonClass(status: RSVPStatus) {
    const baseClass =
      "px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50";

    const isActive = currentRSVP === status;

    switch (status) {
      case "GOING":
        return `${baseClass} ${
          isActive
            ? "bg-green-600 text-white"
            : "bg-green-600/20 text-green-400 hover:bg-green-600/30"
        }`;
      case "NOT_GOING":
        return `${baseClass} ${
          isActive
            ? "bg-red-600 text-white"
            : "bg-red-600/20 text-red-400 hover:bg-red-600/30"
        }`;
      case "MAYBE":
        return `${baseClass} ${
          isActive
            ? "bg-yellow-600 text-white"
            : "bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30"
        }`;
      default:
        return baseClass;
    }
  }

  async function handleRSVP(status: RVSPStatus) {
    setIsLoading(true);
    try {
      const result = await rsvpToEvent(eventId, status);
      if (result.success) {
      } else {
        console.error(result.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">
        RSVP to this event
      </h3>
      <div className="flex flex-wrap gap-3">
        <button
          disabled={isLoading}
          className={getButtonClass("GOING")}
          onClick={() => handleRSVP("GOING")}
        >
          Going
        </button>
        <button
          disabled={isLoading}
          className={getButtonClass("MAYBE")}
          onClick={() => handleRSVP("MAYBE")}
        >
          Maybe
        </button>
        <button
          disabled={isLoading}
          className={getButtonClass("NOT_GOING")}
          onClick={() => handleRSVP("NOT_GOING")}
        >
          Not Going
        </button>
      </div>
    </div>
  );
}
