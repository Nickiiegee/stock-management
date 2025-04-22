
import { ArrowRight, Box } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export interface WarehouseCardProps {
  id: string
  name: string
  location: string
  itemCount: number
  capacityUsed: number
  lowStockCount: number
}

export const WarehouseCard = ({
  id,
  name,
  location,
  itemCount,
  capacityUsed,
  lowStockCount
}: WarehouseCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{name}</CardTitle>
          <Box className="h-5 w-5 text-muted-foreground" />
        </div>
        <CardDescription>{location}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Capacity Used</span>
            <span className="text-sm font-medium">{capacityUsed}%</span>
          </div>
          <Progress value={capacityUsed} className="h-2" />
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
          href={`/warehouses/${id}`}
          className="flex w-full items-center justify-center gap-1 rounded-sm px-3 py-2 text-sm font-medium text-primary hover:underline"
        >
          View Inventory
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}
