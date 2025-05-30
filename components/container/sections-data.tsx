import { useContainerSections } from "@/utils/useContainerSections";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "../ui/button";
import AddSection from "./add-section";
import AddStockModal from "./add-stock";
import StockTable from "./items-table";
import RemoveSection from "./remove-section";

export default function SectionsData() {
  const pathname = usePathname();
  const splittedPathname = pathname.split("/").at(-1);
  let id = "";
  if (splittedPathname === "warehouse")
    id = "dec3eebc-7908-4863-8acc-14647b6a81f8";
  // @ts-ignore
  else id = splittedPathname;
  // @ts-ignore
  const { data, error, isLoading } = useContainerSections(id);
  const route = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <>
        <div className="flex justify-start">
          <Button variant="link" className="mb-4" onClick={() => route.back()}>
            <IoMdArrowRoundBack />
          </Button>
          <h1 className="text-3xl font-bold capitalize">
            {data.container_name}
          </h1>
          <div className="flex justify-end ml-auto">
            <AddSection containerId={id} />
          </div>
        </div>
        {data.sections.length === 0 ? (
          <div>No sections or stock found for this container yet.</div>
        ) : (
          <>
            {data.sections.map((section: any) => (
              <div key={section.section_id}>
                <div className="flex justify-start">
                  <h2 className="text-xl pl-8 font-bold capitalize mt-3 mb-3">
                    {section.section_name}
                  </h2>
                    <div className="flex items-center justify-end mt-3 mb-3 ml-auto space-x-2">
                    <AddStockModal sectionId={section.section_id} />
                    <RemoveSection sectionId={section.section_id} />
                    </div>
                </div>
                <StockTable data={section} sections={data.sections} />
              </div>
            ))}
          </>
        )}
      </>
    </div>
  );
}
