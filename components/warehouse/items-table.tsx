"use client";

import { useState } from "react";

export default function ItemsTable({ data }: { data: [] }) {
  const [page, setPage] = useState(1);

  return (
    <div className="overflow-auto">
      <div className="bg-white shadow-md rounded-lg relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Item
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Quantity
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Last Updated
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Last Updated By
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item: any) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {item.updated_at}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {item.last_updated_by}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex gap-2">
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
            Previous
          </button>
          <span>Page {page}</span>
          <button onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}
