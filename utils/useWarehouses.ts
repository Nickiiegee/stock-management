
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
const TABLE = "warehouses";

// Read: all warehouses
export function useWarehouses() {
  return useQuery({
    queryKey: ["warehouses"],
    queryFn: async () => {
      const { data, error } = await supabase.from(TABLE).select("*").order("name");
      if (error) throw error;
      return data;
    },
  });
}

// Read: single warehouse by id
export function useWarehouse(id: string | undefined) {
  return useQuery({
    queryKey: ["warehouses", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

// Create: warehouse
export function useCreateWarehouse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: { name: string; location: string; capacity: number }) => {
      const { data, error } = await supabase.from(TABLE).insert([values]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["warehouses"] });
    },
  });
}

// Update: warehouse
export function useUpdateWarehouse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...values }: { id: string; name?: string; location?: string; capacity?: number }) => {
      const { data, error } = await supabase.from(TABLE).update(values).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["warehouses"] });
    },
  });
}

// Delete: warehouse
export function useDeleteWarehouse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(TABLE).delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["warehouses"] });
    },
  });
}
