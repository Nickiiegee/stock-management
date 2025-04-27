import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { CardContent } from "@mui/material";
import { ArrowRight, Box, File, Ship, ShipWheel, WavesIcon, Wrench } from "lucide-react";
import Link from "next/link";
import { createElement } from "react";

export interface WarehouseCardProps {
  id: string;
  name: string;
  container: string;
}

export const ContainerCard = ({ id, name, container }: WarehouseCardProps) => {

  const getIcon = () => {
    switch (container) {
      case 'warehouse':
        return Box;
      case 'vessel':
        return ShipWheel;
      case 'diving':
        return WavesIcon;
      case 'trencher':
        return Ship;
      case 'survey':
        return File;
      case 'welding':
        return Wrench;
      default:
        return Box
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{name}</CardTitle>
          {createElement(getIcon())}
        </div>
        <CardDescription>{container}</CardDescription>
      </CardHeader>
      <CardContent />
      <CardFooter className="border-t bg-muted/50 p-2">
        <Link
          href={
            container === "warehouse"
              ? "/warehouse"
              : container === "container"
                ? `/dashboard/${id}`
                : `/${container}/${id}`
          }
          className="flex w-full items-center justify-center gap-1 rounded-sm px-3 py-2 text-sm font-medium text-primary hover:underline"
        >
          View {container}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};
