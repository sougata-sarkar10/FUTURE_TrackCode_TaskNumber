"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Eye } from "lucide-react"
import Image from "next/image"

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered"
  total: number
  items: OrderItem[]
}

interface OrderHistoryProps {
  orders: Order[]
  onViewOrder: (orderId: string) => void
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
}

export function OrderHistory({ orders, onViewOrder }: OrderHistoryProps) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
        <p className="text-gray-500">Your order history will appear here once you make your first purchase.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Order History</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                  <p className="text-sm text-gray-500">Placed on {order.date}</p>
                </div>
                <div className="text-right">
                  <Badge className={statusColors[order.status]}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                  <p className="text-lg font-bold mt-1">${order.total.toFixed(2)}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {order.items.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                {order.items.length > 2 && (
                  <p className="text-sm text-gray-500">
                    +{order.items.length - 2} more {order.items.length - 2 === 1 ? "item" : "items"}
                  </p>
                )}

                <div className="pt-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    onClick={() => onViewOrder(order.id)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Order Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
