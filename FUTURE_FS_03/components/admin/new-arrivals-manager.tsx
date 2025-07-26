"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Sparkles, CalendarIcon, Search, Plus } from "lucide-react"
import Image from "next/image"
import { format } from "date-fns"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  isNew: boolean
  newArrivalDate?: string
  newArrivalEndDate?: string
}

interface NewArrivalsManagerProps {
  products: Product[]
  onUpdateProducts: (products: Product[]) => void
}

export function NewArrivalsManager({ products, onUpdateProducts }: NewArrivalsManagerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedEndDate, setSelectedEndDate] = useState<Date>()
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const newArrivals = products.filter((product) => product.isNew)

  const handleToggleNewArrival = (productId: number, isNew: boolean) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          isNew,
          newArrivalDate: isNew ? new Date().toISOString() : undefined,
          newArrivalEndDate: isNew && selectedEndDate ? selectedEndDate.toISOString() : undefined,
        }
      }
      return product
    })
    onUpdateProducts(updatedProducts)
  }

  const handleBulkAddNewArrivals = () => {
    if (!selectedDate) return

    const endDate = selectedEndDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days default

    const updatedProducts = products.map((product) => {
      // Add products from the last 7 days as new arrivals
      const productDate = new Date(product.id * 1000) // Using ID as timestamp for demo
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

      if (productDate > weekAgo && !product.isNew) {
        return {
          ...product,
          isNew: true,
          newArrivalDate: selectedDate.toISOString(),
          newArrivalEndDate: endDate.toISOString(),
        }
      }
      return product
    })

    onUpdateProducts(updatedProducts)
  }

  const handleRemoveExpiredNewArrivals = () => {
    const now = new Date()
    const updatedProducts = products.map((product) => {
      if (product.isNew && product.newArrivalEndDate) {
        const endDate = new Date(product.newArrivalEndDate)
        if (now > endDate) {
          return {
            ...product,
            isNew: false,
            newArrivalDate: undefined,
            newArrivalEndDate: undefined,
          }
        }
      }
      return product
    })
    onUpdateProducts(updatedProducts)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">New Arrivals Manager</h2>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRemoveExpiredNewArrivals} variant="outline">
            Remove Expired
          </Button>
          <Button onClick={handleBulkAddNewArrivals} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Bulk Add Recent
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Sparkles className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active New Arrivals</p>
                <p className="text-2xl font-bold text-gray-900">{newArrivals.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CalendarIcon className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                  {
                    newArrivals.filter((p) => {
                      if (!p.newArrivalDate) return false
                      const arrivalDate = new Date(p.newArrivalDate)
                      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                      return arrivalDate > weekAgo
                    }).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold">₹</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New Arrivals Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{newArrivals.reduce((sum, p) => sum + p.price, 0).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Date Selection */}
      <Card>
        <CardHeader>
          <CardTitle>New Arrival Period Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Select start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date)
                      setShowDatePicker(false)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>End Date (Optional)</Label>
              <Popover open={showEndDatePicker} onOpenChange={setShowEndDatePicker}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedEndDate ? format(selectedEndDate, "PPP") : "Select end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedEndDate}
                    onSelect={(date) => {
                      setSelectedEndDate(date)
                      setShowEndDatePicker(false)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
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
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{product.category.replace("-", " ")}</p>
                    <p className="text-sm font-bold">₹{product.price.toLocaleString("en-IN")}</p>
                    {product.newArrivalDate && (
                      <p className="text-xs text-green-600">
                        Added: {format(new Date(product.newArrivalDate), "MMM dd, yyyy")}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {product.isNew && <Badge className="bg-green-500 text-white">New Arrival</Badge>}
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={product.isNew}
                      onCheckedChange={(checked) => handleToggleNewArrival(product.id, checked)}
                    />
                    <Label className="text-sm">New Arrival</Label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
