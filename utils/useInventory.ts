
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
const TABLE = "inventory";

// All inventory by location (e.g. warehouse)
export function useInventoryByLocation(locationType: string, locationId: string) {
  return useQuery({
    queryKey: ["inventory", locationType, locationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(TABLE)
        .select("*")
        .eq("location_type", locationType)
        .eq("location_id", locationId);
      if (error) throw error;
      return data;
    },
    enabled: !!locationType && !!locationId,
  });
}

// Single inventory record by id
export function useInventory(id: string | undefined) {
  return useQuery({
    queryKey: ["inventory", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

// Create inventory record
export function useCreateInventory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: any) => {
      const { data, error } = await supabase.from(TABLE).insert([values]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
  });
}

// Update inventory
export function useUpdateInventory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...values }: { id: string; [k: string]: any }) => {
      const { data, error } = await supabase.from(TABLE).update(values).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
  });
}

// Delete
export function useDeleteInventory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(TABLE).delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
  });
}
