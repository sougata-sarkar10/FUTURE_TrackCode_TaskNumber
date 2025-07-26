"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  color?: string
}

interface ShoppingCartProps {
  items: CartItem[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
  onCheckout: () => void
}

export function ShoppingCart({ items, onUpdateQuantity, onRemoveItem, onCheckout }: ShoppingCartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
        <p className="text-gray-500 mb-6">Add some beautiful accessories to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
        <Badge variant="secondary" className="text-sm">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </Badge>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                  {item.color && <p className="text-sm text-gray-500">Color: {item.color}</p>}
                  <p className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString()}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-transparent"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-brand-light-mint">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold">Subtotal:</span>
              <span className="font-bold">₹{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-4 flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <Button className="w-full bg-brand-black hover:bg-gray-800 text-white" onClick={onCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
