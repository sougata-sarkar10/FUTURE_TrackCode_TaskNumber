"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingBag, Trash2 } from "lucide-react"
import Image from "next/image"

interface WishlistItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  colors: string[]
  stock: number
}

interface WishlistModalProps {
  items: WishlistItem[]
  onRemoveFromWishlist: (id: number) => void
  onAddToCart: (item: WishlistItem) => void
  onBuyNow: (item: WishlistItem) => void
}

export function WishlistModal({ items, onRemoveFromWishlist, onAddToCart, onBuyNow }: WishlistModalProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
        <p className="text-gray-500 mb-6">Save items you love to view them later!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
        <Badge variant="secondary" className="text-sm">
          {items.length} {items.length === 1 ? "item" : "items"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-300 bg-white">
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Remove from Wishlist */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white text-red-500 hover:text-red-700"
                  onClick={() => onRemoveFromWishlist(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>

                {/* Sale Badge */}
                {item.originalPrice && <Badge className="absolute top-3 left-3 bg-red-500 text-white">Sale</Badge>}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>

                {/* Stock Status */}
                <div className="mb-2">
                  {item.stock === 0 ? (
                    <span className="text-red-600 text-sm font-medium">Out of Stock</span>
                  ) : item.stock <= 5 ? (
                    <span className="text-yellow-600 text-sm font-medium">Only {item.stock} left!</span>
                  ) : (
                    <span className="text-green-600 text-sm font-medium">{item.stock} available</span>
                  )}
                </div>

                {/* Colors */}
                <div className="flex items-center gap-1 mb-3">
                  {item.colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded-full border-2 border-gray-200 ${
                        color === "pink"
                          ? "bg-pink-300"
                          : color === "blue"
                            ? "bg-blue-300"
                            : color === "purple"
                              ? "bg-purple-300"
                              : color === "gold"
                                ? "bg-yellow-300"
                                : color === "silver"
                                  ? "bg-gray-300"
                                  : color === "rose-gold"
                                    ? "bg-pink-200"
                                    : color === "clear"
                                      ? "bg-white"
                                      : color === "lavender"
                                        ? "bg-purple-200"
                                        : color === "mint"
                                          ? "bg-green-200"
                                          : color === "white"
                                            ? "bg-white"
                                            : color === "bronze"
                                              ? "bg-yellow-600"
                                              : "bg-gray-300"
                      }`}
                    />
                  ))}
                  {item.colors.length > 3 && <span className="text-xs text-gray-500">+{item.colors.length - 3}</span>}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-lg text-gray-900">₹{item.price.toLocaleString()}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button
                    className="w-full bg-white text-gray-900 hover:bg-gray-50 border"
                    onClick={() => onAddToCart(item)}
                    disabled={item.stock === 0}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </Button>
                  <Button
                    className="w-full bg-brand-black text-white hover:bg-gray-800"
                    onClick={() => onBuyNow(item)}
                    disabled={item.stock === 0}
                  >
                    {item.stock === 0 ? "Out of Stock" : "Buy Now"}
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
