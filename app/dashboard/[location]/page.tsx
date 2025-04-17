"use server";
import WarehouseDetails from "@/components/warehouse";

interface PageProps {
  params: Promise<{ location: string }>;
}

export default async function locationPage(props: PageProps) {
  const { location } = await props.params;

  return (
    <div className="w-full h-full">
      <WarehouseDetails location={location} />
    </div>
  );
}
