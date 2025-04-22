
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
const TABLE = "stock_sections";

// All
export function useStockSections() {
  return useQuery({
    queryKey: ["stock_sections"],
    queryFn: async () => {
      const { data, error } = await supabase.from(TABLE).select("*");
      if (error) throw error;
      return data;
    },
  });
}

// By id
export function useStockSection(id: string | undefined) {
  return useQuery({
    queryKey: ["stock_sections", id],
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
export function useCreateStockSection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: { name: string; type: "vessel" | "equipment" }) => {
      const { data, error } = await supabase.from(TABLE).insert([values]).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["stock_sections"] }),
  });
}

// Update
export function useUpdateStockSection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...values }: { id: string; [k: string]: any }) => {
      const { data, error } = await supabase.from(TABLE).update(values).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["stock_sections"] }),
  });
}

// Delete
export function useDeleteStockSection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(TABLE).delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["stock_sections"] }),
  });
}
