"use client";

import { getSupabase } from "./supabase";

export type AppEvent =
  | "onboarding_started"
  | "onboarding_completed"
  | "level_selected"
  | "first_session_started"
  | "session_started"
  | "exercise_completed"
  | "session_completed"
  | "day_completed"
  | "rest_confirmed"
  | "badge_unlocked"
  | "missed_day_returned"
  | "reminder_set"
  | "weekly_goal_set"
  | "calendar_added"
  | "app_installed"
  | "session_feedback"
  | "safety_stop_clicked";

// Lichtgewicht, privacyvriendelijke logging. No-op zonder Supabase/sessie.
// Fire-and-forget: roep aan met `void track(...)`, faalt nooit hard.
export async function track(
  event: AppEvent,
  props: Record<string, unknown> = {},
): Promise<void> {
  try {
    const sb = getSupabase();
    if (!sb) return;
    const { data } = await sb.auth.getUser();
    const uid = data.user?.id;
    if (!uid) return;
    await sb.from("events").insert({ user_id: uid, event, props });
  } catch {
    /* stil falen; analytics mag de app nooit breken */
  }
}
