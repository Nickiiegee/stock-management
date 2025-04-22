
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const TABLE = "items";

// All items
export function useItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const { data, error } = await supabase.from(TABLE).select("*");
      if (error) throw error;
      return data;
    },
  });
}

// Single item
export function useItem(id: string | undefined) {
  return useQuery({
    queryKey: ["items", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase.from(TABLE).select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

// Create
export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: { name: string; sku: string; category: string; lead_time: string }) => {
      const { data, error } = await supabase.from(TABLE).insert([values]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items"] }),
  });
}

// Update
export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...values }: { id: string; [k: string]: any }) => {
      const { data, error } = await supabase.from(TABLE).update(values).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items"] }),
  });
}

// Delete
export function useDeleteItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(TABLE).delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items"] }),
  });
}
