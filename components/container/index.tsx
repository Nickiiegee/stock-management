"use client";
import SectionsData from "./sections-data";

export default function Container() {
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
