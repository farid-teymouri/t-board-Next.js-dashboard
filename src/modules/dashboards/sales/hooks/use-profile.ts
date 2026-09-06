import { useQuery } from "@tanstack/react-query";

import { apiGet } from "@/lib/api/client";

import type { UserProfile } from "@/types/profile";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],

    queryFn: () => apiGet<UserProfile>("/api/profile"),
  });
}
