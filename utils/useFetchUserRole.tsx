import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

const supabase = createClient();

export const useFetchUserRole = () => {
  return useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        return null;
      }
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("id", user.id)
        .single();
      if (error) {
        console.error(error);
        return null;
      }
      if (!data) {
        return null;
      }
      return data.role;
    },
    staleTime: 60 * 60 * 1000,
    retry: 1,
  });
};
