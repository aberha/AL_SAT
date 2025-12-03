"use client";

import React from "react";
import { ActivityItem } from "@/types";

interface RecentActivityProps {
  activities: ActivityItem[];
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="bg-[var(--card)] rounded-lg border border-[var(--border)]">
      <div className="p-4 border-b border-[var(--border)]">
        <h3 className="text-sm font-semibold text-[var(--foreground)]">Recent Activity</h3>
      </div>
      
      <div className="divide-y divide-[var(--border)]">
        {activities.slice(0, 5).map((activity) => (
          <div key={activity.id} className="p-3">
            <p className="text-sm text-[var(--foreground)]">{activity.description}</p>
            <p className="text-xs text-[var(--muted-foreground)]">{activity.timestamp}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

