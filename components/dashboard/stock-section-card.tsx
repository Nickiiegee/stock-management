
import { ArrowRight, Ship, Wrench } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface StockSectionCardProps {
  id: string
  name: string
  type: 'vessel' | 'equipment'
  itemCount: number
  lowStockCount: number
  lastUpdated: string
}

export const StockSectionCard = ({
  id,
  name,
  type,
  itemCount,
  lowStockCount,
  lastUpdated
}: StockSectionCardProps) => {
  const Icon = type === 'vessel' ? Ship : Wrench
  const path = type === 'vessel' ? `/vessels/${id}` : `/dive-equipment/${id}`

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{name}</CardTitle>
          <Icon className="h-5 w-5 text-muted-foreground" />
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
          View Inventory
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}
