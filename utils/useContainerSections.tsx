import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "./supabase/client";

const supabase = createClient();

// Single inventory record by id
export function useFetchContainers() {
  return useQuery({
    queryKey: ["containers"],
    queryFn: async () => {
      const { data, error } = await supabase.from("containers").select("id, name, container, description");
      // .eq("id", id)
      // .single();
      if (error) throw error;
      return data;
    },
  });
}

export function useContainerSections(containerId: string) {
  return useQuery({
    queryKey: ["containerSections", containerId],
    queryFn: async () => {
      const { data, error } = await supabase.rpc(
        "get_container_sections_with_stock",
        { input_container_id: containerId }
      );

      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!containerId,
    staleTime: 0,
  });
}

export const useAddContainer = (containerType: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (container: string) => {
      const { error } = await supabase
        .from("containers")
        .insert({ name: container, container: containerType });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["containers"],
      });
    },
  });
};

export const useAddSection = (containerId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (section: string) => {
      const { error } = await supabase
        .from("sections")
        .insert({ name: section, container_id: containerId });

      if (error) throw error;

      return section;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["containerSections", containerId],
      });
    },
  });
};

export const useUpdateSection = (containerId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ sectionId, sectionName }: { sectionId: string; sectionName: string }) => {
      const { data, error } = await supabase
        .from("sections")
        .update({ name: sectionName })
        .eq("id", sectionId)
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["containerSections", containerId] });
    },
  });
};

export const useRemoveSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (sectionId: string) => {
      const { error } = await supabase
        .from("sections")
        .delete()
        .eq("id", sectionId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["containerSections"] });
    },
  });
}

export const useAddStockItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (items: any[]) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const date = new Date().toISOString();

      for (const item of items) {
        const { error } = await supabase
          .from("stock")
          .insert({ ...item, last_updated_by: user?.email, updated_at: date });

        if (error) throw error;
      }

      return items;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["containerSections"] });
    },
  });
};

export const useUpdateStockItem = () => {
  const queryClient = useQueryClient();
  const date = new Date().toISOString();
  return useMutation({
    mutationFn: async ({ id, ...values }: { id: string; [k: string]: any }) => {
      const { data, error } = await supabase
        .from("stock")
        .update({...values, updated_at: date})
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["containerSections"] });
    },
  });
};

export const useDeleteStockItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('stock')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["containerSections"] });
    },
  });
};

export const useMoveStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ newSectionId, itemId }: { newSectionId: string; itemId: string; }) => {
      const { data, error } = await supabase
        .from("stock")
        .update({ section_id: newSectionId })
        .eq('id', itemId);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["containerSections"] });
    },
  });
};

export const useUpdateContainerDescription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, description }: { id: string; description: string }) => {
      const { error } = await supabase
        .from("containers")
        .update({ description })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["containers"] });
    },
  });
}

export const useDeleteContainer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("containers")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["containers"] });
    },
  });
};
