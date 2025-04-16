"use server";
import WarehouseDetails from "@/components/warehouse";

interface PageProps {
  params: Promise<{ country: string }>;
}

export default async function CountryPage(props: PageProps) {
  const { country } = await props.params;

  return (
    <div className="w-full h-full">
      <WarehouseDetails country={country} />
    </div>
  );
}
