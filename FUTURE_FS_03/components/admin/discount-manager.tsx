"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Percent, CalendarIcon, Search, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { format } from "date-fns"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  discountPercentage?: number
  discountStartDate?: string
  discountEndDate?: string
}

interface DiscountCode {
  id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  minOrderAmount: number
  maxDiscount?: number
  startDate: string
  endDate: string
  usageLimit: number
  usedCount: number
  isActive: boolean
}

interface DiscountManagerProps {
  products: Product[]
  onUpdateProducts: (products: Product[]) => void
}

export function DiscountManager({ products, onUpdateProducts }: DiscountManagerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showDiscountForm, setShowDiscountForm] = useState(false)
  const [showCodeForm, setShowCodeForm] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  const [discountForm, setDiscountForm] = useState({
    percentage: 0,
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
  })

  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([
    {
      id: "1",
      code: "SISTER20",
      type: "percentage",
      value: 20,
      minOrderAmount: 2000,
      maxDiscount: 1000,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      usageLimit: 100,
      usedCount: 15,
      isActive: true,
    },
    {
      id: "2",
      code: "FLAT500",
      type: "fixed",
      value: 500,
      minOrderAmount: 3000,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
      usageLimit: 50,
      usedCount: 8,
      isActive: true,
    },
  ])

  const [newDiscountCode, setNewDiscountCode] = useState<Partial<DiscountCode>>({
    code: "",
    type: "percentage",
    value: 0,
    minOrderAmount: 0,
    maxDiscount: undefined,
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    usageLimit: 100,
    usedCount: 0,
    isActive: true,
  })

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const discountedProducts = products.filter(
    (product) => product.originalPrice && product.originalPrice > product.price,
  )

  const handleApplyDiscount = () => {
    if (selectedProducts.length === 0 || discountForm.percentage === 0) return

    const updatedProducts = products.map((product) => {
      if (selectedProducts.includes(product.id)) {
        const discountAmount = (product.price * discountForm.percentage) / 100
        const newPrice = product.price - discountAmount

        return {
          ...product,
          originalPrice: product.originalPrice || product.price,
          price: Math.round(newPrice),
          discountPercentage: discountForm.percentage,
          discountStartDate: discountForm.startDate?.toISOString(),
          discountEndDate: discountForm.endDate?.toISOString(),
        }
      }
      return product
    })

    onUpdateProducts(updatedProducts)
    setSelectedProducts([])
    setDiscountForm({ percentage: 0, startDate: undefined, endDate: undefined })
    setShowDiscountForm(false)
  }

  const handleRemoveDiscount = (productId: number) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          price: product.originalPrice || product.price,
          originalPrice: undefined,
          discountPercentage: undefined,
          discountStartDate: undefined,
          discountEndDate: undefined,
        }
      }
      return product
    })
    onUpdateProducts(updatedProducts)
  }

  const handleCreateDiscountCode = () => {
    if (!newDiscountCode.code || !newDiscountCode.value) return

    const discountCode: DiscountCode = {
      id: Date.now().toString(),
      code: newDiscountCode.code!,
      type: newDiscountCode.type!,
      value: newDiscountCode.value!,
      minOrderAmount: newDiscountCode.minOrderAmount || 0,
      maxDiscount: newDiscountCode.maxDiscount,
      startDate: newDiscountCode.startDate!,
      endDate: newDiscountCode.endDate!,
      usageLimit: newDiscountCode.usageLimit || 100,
      usedCount: 0,
      isActive: true,
    }

    setDiscountCodes([...discountCodes, discountCode])
    setNewDiscountCode({
      code: "",
      type: "percentage",
      value: 0,
      minOrderAmount: 0,
      maxDiscount: undefined,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      usageLimit: 100,
      usedCount: 0,
      isActive: true,
    })
    setShowCodeForm(false)
  }

  const handleToggleCodeStatus = (codeId: string) => {
    setDiscountCodes(discountCodes.map((code) => (code.id === codeId ? { ...code, isActive: !code.isActive } : code)))
  }

  const handleDeleteCode = (codeId: string) => {
    setDiscountCodes(discountCodes.filter((code) => code.id !== codeId))
  }

  const totalDiscountValue = discountedProducts.reduce(
    (sum, product) => sum + ((product.originalPrice || 0) - product.price),
    0,
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Percent className="w-6 h-6 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-900">Discount Manager</h2>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowCodeForm(true)} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add Discount Code
          </Button>
          <Button onClick={() => setShowDiscountForm(true)} className="bg-red-600 hover:bg-red-700">
            <Percent className="w-4 h-4 mr-2" />
            Apply Discount
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Percent className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Discounted Products</p>
                <p className="text-2xl font-bold text-gray-900">{discountedProducts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">₹</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Discount Value</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalDiscountValue.toLocaleString("en-IN")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">#</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Codes</p>
                <p className="text-2xl font-bold text-gray-900">{discountCodes.filter((c) => c.isActive).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">%</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Discount</p>
                <p className="text-2xl font-bold text-gray-900">
                  {discountedProducts.length > 0
                    ? Math.round(
                        discountedProducts.reduce((sum, p) => sum + (p.discountPercentage || 0), 0) /
                          discountedProducts.length,
                      )
                    : 0}
                  %
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Discount Codes */}
      <Card>
        <CardHeader>
          <CardTitle>Discount Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {discountCodes.map((code) => (
              <div key={code.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg">{code.code}</h3>
                    <Badge className={code.isActive ? "bg-green-500" : "bg-gray-500"}>
                      {code.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {code.type === "percentage" ? `${code.value}% off` : `₹${code.value} off`}
                    {code.minOrderAmount > 0 && ` on orders above ₹${code.minOrderAmount.toLocaleString("en-IN")}`}
                    {code.maxDiscount && ` (max ₹${code.maxDiscount.toLocaleString("en-IN")})`}
                  </p>
                  <p className="text-xs text-gray-500">
                    Valid: {format(new Date(code.startDate), "MMM dd")} - {format(new Date(code.endDate), "MMM dd")}
                  </p>
                  <p className="text-xs text-gray-500">
                    Used: {code.usedCount}/{code.usageLimit}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleCodeStatus(code.id)}
                    className={code.isActive ? "text-red-600" : "text-green-600"}
                  >
                    {code.isActive ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCode(code.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search products..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Products List */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedProducts([...selectedProducts, product.id])
                      } else {
                        setSelectedProducts(selectedProducts.filter((id) => id !== product.id))
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{product.category.replace("-", " ")}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">₹{product.price.toLocaleString("en-IN")}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                      {product.discountPercentage && (
                        <Badge className="bg-red-500 text-white">{product.discountPercentage}% OFF</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {product.originalPrice && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveDiscount(product.id)}
                      className="text-red-600"
                    >
                      Remove Discount
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Discount Form Modal */}
      <Dialog open={showDiscountForm} onOpenChange={setShowDiscountForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply Discount</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Discount Percentage</Label>
              <Input
                type="number"
                placeholder="Enter discount percentage"
                value={discountForm.percentage}
                onChange={(e) => setDiscountForm({ ...discountForm, percentage: Number.parseFloat(e.target.value) })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {discountForm.startDate ? format(discountForm.startDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={discountForm.startDate}
                      onSelect={(date) => setDiscountForm({ ...discountForm, startDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {discountForm.endDate ? format(discountForm.endDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={discountForm.endDate}
                      onSelect={(date) => setDiscountForm({ ...discountForm, endDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <p className="text-sm text-gray-600">Selected products: {selectedProducts.length}</p>
            <div className="flex gap-2">
              <Button onClick={handleApplyDiscount} className="bg-red-600 hover:bg-red-700">
                Apply Discount
              </Button>
              <Button variant="outline" onClick={() => setShowDiscountForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Discount Code Form Modal */}
      <Dialog open={showCodeForm} onOpenChange={setShowCodeForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Discount Code</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Discount Code</Label>
              <Input
                placeholder="e.g., SAVE20"
                value={newDiscountCode.code}
                onChange={(e) => setNewDiscountCode({ ...newDiscountCode, code: e.target.value.toUpperCase() })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Discount Type</Label>
                <Select
                  value={newDiscountCode.type}
                  onValueChange={(value) => setNewDiscountCode({ ...newDiscountCode, type: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Value</Label>
                <Input
                  type="number"
                  placeholder={newDiscountCode.type === "percentage" ? "20" : "500"}
                  value={newDiscountCode.value}
                  onChange={(e) => setNewDiscountCode({ ...newDiscountCode, value: Number.parseFloat(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Minimum Order Amount (₹)</Label>
                <Input
                  type="number"
                  placeholder="1000"
                  value={newDiscountCode.minOrderAmount}
                  onChange={(e) =>
                    setNewDiscountCode({ ...newDiscountCode, minOrderAmount: Number.parseFloat(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Usage Limit</Label>
                <Input
                  type="number"
                  placeholder="100"
                  value={newDiscountCode.usageLimit}
                  onChange={(e) =>
                    setNewDiscountCode({ ...newDiscountCode, usageLimit: Number.parseInt(e.target.value) })
                  }
                />
              </div>
            </div>
            {newDiscountCode.type === "percentage" && (
              <div className="space-y-2">
                <Label>Maximum Discount Amount (₹) - Optional</Label>
                <Input
                  type="number"
                  placeholder="1000"
                  value={newDiscountCode.maxDiscount || ""}
                  onChange={(e) =>
                    setNewDiscountCode({
                      ...newDiscountCode,
                      maxDiscount: Number.parseFloat(e.target.value) || undefined,
                    })
                  }
                />
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={handleCreateDiscountCode} className="bg-brand-black hover:bg-gray-800">
                Create Code
              </Button>
              <Button variant="outline" onClick={() => setShowCodeForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
