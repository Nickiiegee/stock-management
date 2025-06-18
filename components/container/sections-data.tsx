import {
  useContainerSections,
  useUpdateSection,
  useUpdateSectionOrder,
} from "@/utils/useContainerSections";
import { useFetchUserRole } from "@/utils/useFetchUserRole";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { Pencil } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useAlert } from "../snackbar";
import { Button } from "../ui/button";
import AddSection from "./add-section";
import AddStockModal from "./add-stock";
import StockTable from "./items-table";
import RemoveSection from "./remove-section";

export default function SectionsData() {
  const [editSectionId, setEditSectionId] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [collapsedSections, setCollapsedSections] = useState<
    Record<string, boolean>
  >({});
  const [isSaving, setIsSaving] = useState(false);
  const route = useRouter();
  const showAlert = useAlert();
  const pathname = usePathname();
  const splittedPathname = pathname.split("/").at(-1);
  let id = "";
  if (splittedPathname === "warehouse")
    id = "dec3eebc-7908-4863-8acc-14647b6a81f8";
  // @ts-ignore
  else id = splittedPathname;
  // @ts-ignore
  const { mutate: updateSectionName } = useUpdateSection(id);
  const { data: role } = useFetchUserRole();
  // @ts-ignore
  const { mutate: updateSectionOrder } = useUpdateSectionOrder(id);
  const { data, error, isLoading } = useContainerSections(id); // Collapse all sections by default when data loads

  useEffect(() => {
    if (data?.sections) {
      setCollapsedSections((prev) => {
        const newState: Record<string, boolean> = {};
        data.sections.forEach((section: any) => {
          newState[section.section_id] = prev[section.section_id] ?? true; // Default to collapsed
        });
        return newState;
      });
    }
  }, [data]);

  useEffect(() => {
    if (data?.sections) {
      data.sections.sort((a: any, b: any) => a.order_number - b.order_number);
    }
  }, [data]);

  const handleSectionNameUpdate = async (
    sectionId: string,
    sectionName: string
  ) => {
    updateSectionName(
      { sectionId, sectionName },
      {
        onSuccess: () => {
          showAlert("Updated section name successfully.", "success");
        },
        onError: (err: any) => {
          console.error(err);
          showAlert(
            "Failed to update section name. Please try again.",
            "error"
          );
        },
      }
    );
    setEditSectionId("");
    setSectionName("");
    setIsSaving(false);
  };

  const handleMoveSection = (currentIndex: number, newIndex: number) => {
    if (newIndex < 0 || newIndex >= data.sections.length) return;

    const updatedSections = [...data.sections];
    const [movedSection] = updatedSections.splice(currentIndex, 1);
    updatedSections.splice(newIndex, 0, movedSection);

    updateSectionOrder(
      { sectionId: movedSection.section_id, sectionOrderNumber: newIndex },
      {
        onSuccess: () => {
          showAlert("Moved section successfully.", "success");
        },
        onError: (err: any) => {
          console.error(err);
          showAlert("Failed to move section. Please try again.", "error");
        },
      }
    );
  };

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
            {data.sections.map((section: any, index: number) => (
              <div key={section.section_id}>
                <div className="flex justify-start items-center">
                  <div
                    className="flex flex-col mr-2 cursor-grab"
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("sectionIndex", index.toString());
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.add("bg-gray-100");
                    }}
                    onDragLeave={(e) => {
                      e.currentTarget.classList.remove("bg-gray-100");
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove("bg-gray-100");
                      const fromIndex = Number(
                        e.dataTransfer.getData("sectionIndex")
                      );
                      if (fromIndex !== index) {
                        handleMoveSection(fromIndex, index);
                      }
                    }}
                    title="Drag to reorder section"
                  >
                    <DragHandleIcon />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    aria-label={
                      section.collapsed ? "Expand section" : "Collapse section"
                    }
                    onClick={() => {
                      setCollapsedSections((prev: Record<string, boolean>) => ({
                        ...prev,
                        [section.section_id]: !prev[section.section_id],
                      }));
                    }}
                  >
                    {collapsedSections?.[section.section_id] ? (
                      <span>&#9654;</span>
                    ) : (
                      <span>&#9660;</span>
                    )}
                  </Button>
                  {editSectionId === section.section_id ? (
                    <>
                      <form
                        className="flex flex-col gap-2"
                        onSubmit={async (e) => {
                          e.preventDefault();
                          setIsSaving(true);
                          handleSectionNameUpdate(
                            section.section_id,
                            sectionName
                          );
                        }}
                      >
                        <input
                          className="border rounded px-2 py-1"
                          defaultValue={section.section_name}
                          onChange={(e) => setSectionName(e.target.value)}
                          disabled={isSaving}
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <Button type="submit" size="sm" disabled={isSaving}>
                            {isSaving ? "Saving..." : "Save"}
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => {
                              setEditSectionId("");
                              setSectionName(section.section_name);
                            }}
                            disabled={isSaving}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <h2 className="text-xl pl-8 font-bold capitalize mt-3 mb-3">
                      {section.section_name}
                    </h2>
                  )}
                  <div className="flex items-center justify-end mt-3 mb-3 ml-auto space-x-2">
                    <Button
                      variant="ghost"
                      onClick={() => setEditSectionId(section.section_id)}
                      disabled={role !== "admin"}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <RemoveSection sectionId={section.section_id} />
                    <AddStockModal sectionId={section.section_id} />
                  </div>
                </div>
                {!collapsedSections?.[section.section_id] && (
                  <div className="border rounded-lg p-1 mb-4">
                    <StockTable data={section} sections={data.sections} />
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </>
    </div>
  );
}
