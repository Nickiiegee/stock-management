import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  FileSpreadsheet,
  Ship,
  ShipWheel,
  Waves,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { createElement } from "react";

interface StockSectionCardProps {
  id: string;
  name: string;
  type: string;
  itemCount: number;
  lowStockCount: number;
  lastUpdated: string;
}

export const StockSectionCard = ({
  id,
  name,
  type,
  itemCount,
  lowStockCount,
  lastUpdated,
}: StockSectionCardProps) => {
  const path = `/${type}/${id}`;

  let icon;
  const getIcon = () => {
    switch (type) {
      case "vessels":
        icon = Ship;
        return icon;
      case "diving":
        icon = Waves;
        return icon;
      case "trencher":
        icon = ShipWheel;
        return icon;
      case "welding":
        icon = Wrench;
        return icon;
      case "surveying":
        icon = FileSpreadsheet;
        return icon;
      default:
        icon = Wrench;
        return icon;
    }
  };

  return (
    <>
      {!itemCount ? (
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{name}</CardTitle>
              <div className="h-5 w-5 text-muted-foreground">
                {createElement(getIcon())}
              </div>
            </div>
            <CardDescription>Last updated: {lastUpdated}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Items</p>
                  <p className="text-2xl font-semibold">{itemCount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                  <span className="text-2xl font-semibold">
                    {lowStockCount > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {lowStockCount}
                      </Badge>
                    )}
                    {lowStockCount === 0 && (
                      <span className="text-green-600">0</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 p-2">
            <Link
              href={path}
              className="flex w-full items-center justify-center gap-1 rounded-sm px-3 py-2 text-sm font-medium text-primary hover:underline"
            >
              View Container
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <div>
          <h1>No items available</h1>
        </div>
      )}
    </>
  );
};
