
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
const TABLE = "user_profiles";

// All users (admin only suggested)
export function useUserProfiles() {
  return useQuery({
    queryKey: ["user_profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from(TABLE).select("*").order("full_name");
      if (error) throw error;
      return data;
    },
  });
}

// Own profile
export function useOwnProfile(id: string | undefined) {
  return useQuery({
    queryKey: ["user_profiles", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

// Update profile (admin or own)
export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...values }: { id: string; [k: string]: any }) => {
      const { data, error } = await supabase.from(TABLE).update(values).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user_profiles"] }),
  });
}
