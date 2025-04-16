'use server';
import WarehouseDetails from "@/components/warehouse";

export default async function CountryPage({
  params,
}: {
  params: { country: string };
}) {
  const { country } = await params;

  return (
    <div className="w-full h-full">
      <WarehouseDetails country={country} />
    </div>
  );
}
