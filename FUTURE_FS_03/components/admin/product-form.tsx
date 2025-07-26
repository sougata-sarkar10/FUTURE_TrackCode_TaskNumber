"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { X, Plus } from "lucide-react"

interface Product {
  id?: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  isNew: boolean
  isBestseller: boolean
  colors: string[]
  description: string
  tags: string[]
  stock: number
  isAvailable: boolean
}

interface ProductFormProps {
  product?: Product
  onSave: (product: Product) => void
  onCancel: () => void
}

const categories = [
  { value: "earrings", label: "Earrings" },
  { value: "hair-clips", label: "Hair Clips" },
  { value: "hair-accessories", label: "Hair Accessories" },
  { value: "bracelets", label: "Bracelets" },
  { value: "necklaces", label: "Necklaces" },
  { value: "rings", label: "Rings" },
]

const availableColors = [
  "pink",
  "blue",
  "purple",
  "gold",
  "silver",
  "rose-gold",
  "clear",
  "lavender",
  "mint",
  "white",
  "bronze",
  "black",
]

export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>({
    name: "",
    price: 0,
    originalPrice: undefined,
    image: "/placeholder.svg?height=300&width=300",
    category: "earrings",
    rating: 4.5,
    reviews: 0,
    isNew: false,
    isBestseller: false,
    colors: [],
    description: "",
    tags: [],
    stock: 0,
    isAvailable: true,
    ...product,
  })

  const [newTag, setNewTag] = useState("")
  const [newColor, setNewColor] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, newTag.trim()] })
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((tag) => tag !== tagToRemove) })
  }

  const addColor = () => {
    if (newColor && !formData.colors.includes(newColor)) {
      setFormData({ ...formData, colors: [...formData.colors, newColor] })
      setNewColor("")
    }
  }

  const removeColor = (colorToRemove: string) => {
    setFormData({ ...formData, colors: formData.colors.filter((color) => color !== colorToRemove) })
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{product ? "Edit Product" : "Add New Product"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price (₹) - Optional</Label>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                value={formData.originalPrice || ""}
                onChange={(e) =>
                  setFormData({ ...formData, originalPrice: Number.parseFloat(e.target.value) || undefined })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number.parseInt(e.target.value) || 0 })}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="/placeholder.svg?height=300&width=300"
            />
          </div>

          {/* Colors */}
          <div className="space-y-2">
            <Label>Available Colors</Label>
            <div className="flex gap-2 mb-2">
              <Select value={newColor} onValueChange={setNewColor}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {availableColors.map((color) => (
                    <SelectItem key={color} value={color}>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full border ${
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
                                                  : color === "black"
                                                    ? "bg-black"
                                                    : "bg-gray-300"
                          }`}
                        />
                        {color}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={addColor} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.colors.map((color) => (
                <Badge key={color} variant="secondary" className="flex items-center gap-1">
                  {color}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeColor(color)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Switches */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="isNew"
                checked={formData.isNew}
                onCheckedChange={(checked) => setFormData({ ...formData, isNew: checked })}
              />
              <Label htmlFor="isNew">Mark as New</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isBestseller"
                checked={formData.isBestseller}
                onCheckedChange={(checked) => setFormData({ ...formData, isBestseller: checked })}
              />
              <Label htmlFor="isBestseller">Mark as Bestseller</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isAvailable"
                checked={formData.isAvailable}
                onCheckedChange={(checked) => setFormData({ ...formData, isAvailable: checked })}
              />
              <Label htmlFor="isAvailable">Available for Sale</Label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="bg-brand-black hover:bg-gray-800">
              {product ? "Update Product" : "Add Product"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
