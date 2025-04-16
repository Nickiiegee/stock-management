import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const supabase = createClient();

type Item = {
  id: number;
  name: string;
  quantity: number;
  country: string;
};

const fetchItems = async (country: string): Promise<Item[]> => {
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("country", country)
    .order("name", { ascending: true });

  if (error) throw error;
  return data;
};

export const useItems = (country: string) => {
  return useQuery({
    queryKey: ["items", country],
    queryFn: () => fetchItems(country),
  });
};

export const useUpdateItems = (country: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: any[]) => {

      const {
        data: { user },
      } = await supabase.auth.getUser();
      // Step 1: Fetch current quantities
      const { data: currentItems, error: fetchError } = await supabase
        .from("items")
        .select("id, quantity")
        .in(
          "id",
          updates.map((u) => u.id)
        );

      if (fetchError) throw new Error(fetchError.message);

      // Step 2: Calculate new quantities
      const updatedItems = currentItems.map((item) => {
        const change =
          updates.find((u) => u.id === item.id).quantity || 0;
        return {
          id: item.id,
          quantity: item.quantity + change,
        };
      });

      // Step 3: Perform bulk update
      for (const item of updatedItems) {
        const { error } = await supabase
          .from("items")
          .update({ quantity: item.quantity, last_updated_by: user?.email })
          .eq("id", item.id);

        if (error) throw error;
      }

      return updatedItems;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items", country] });
    },
  });
};
