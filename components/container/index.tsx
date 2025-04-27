"use client";
import { useQueryClient } from "@tanstack/react-query";
import SectionsData from "./sections-data";
import { useEffect } from "react";

export default function Container() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.resetQueries({ queryKey: ["containerSections"]})
  }, []);

  return <SectionsData />;
}

// {openUpdateModal && (
//   <BulkUpdateModal
//     location={location}
//     /* @ts-ignore */
//     items={data}
//     open={openUpdateModal}
//     onClose={() => setOpenUpdateModal(false)}
//   />
// )}
// {/* {openAddModal && (
//   <AddItemsModal
//     location={location}
//     open={openAddModal}
//     onClose={() => setOpenAddModal(false)}
//   />
// )} */}
