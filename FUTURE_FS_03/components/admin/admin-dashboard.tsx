"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Package, ShoppingCart, Search, AlertTriangle, CheckCircle, Settings } from "lucide-react"
import Image from "next/image"
import { ProductForm } from "./product-form"
import { AdminSettings } from "./admin-settings"
import { NewArrivalsManager } from "./new-arrivals-manager"
import { DiscountManager } from "./discount-manager"

interface Product {
  id: number
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

interface AdminDashboardProps {
  products: Product[]
  onUpdateProducts: (products: Product[]) => void
  onLogout: () => void
}

export function AdminDashboard({ products, onUpdateProducts, onLogout }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showProductForm, setShowProductForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | undefined>()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeSection, setActiveSection] = useState("dashboard")

  const [showSettings, setShowSettings] = useState(false)
  const [adminSettings, setAdminSettings] = useState({
    storeName: "Sister Jewellery Wardrobe",
    storeDescription: "Beautiful jewellery and accessories for sisters everywhere",
    currency: "INR",
    taxRate: 18,
    lowStockThreshold: 5,
    enableLowStockAlerts: true,
    enableOutOfStockHiding: false,
    enableEmailNotifications: true,
    autoApproveReviews: false,
    maintenanceMode: false,
  })
  const [adminCredentials, setAdminCredentials] = useState({
    username: "admin",
    password: "admin123",
  })

  const handlePasswordChange = (oldPassword: string, newPassword: string) => {
    if (oldPassword === adminCredentials.password) {
      setAdminCredentials({ ...adminCredentials, password: newPassword })
      return true
    }
    return false
  }

  const handleSettingsUpdate = (newSettings: any) => {
    setAdminSettings(newSettings)
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleSaveProduct = (productData: Product) => {
    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map((p) =>
        p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p,
      )
      onUpdateProducts(updatedProducts)
    } else {
      // Add new product
      const newProduct = { ...productData, id: Date.now() }
      onUpdateProducts([...products, newProduct])
    }
    setShowProductForm(false)
    setEditingProduct(undefined)
  }

  const handleDeleteProduct = (productId: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter((p) => p.id !== productId)
      onUpdateProducts(updatedProducts)
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setShowProductForm(true)
  }

  const totalProducts = products.length
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
  const lowStockProducts = products.filter((p) => p.stock < adminSettings.lowStockThreshold).length
  const outOfStockProducts = products.filter((p) => p.stock === 0).length

  const categories = [...new Set(products.map((p) => p.category))]

  return (
    <div className="min-h-screen bg-brand-light-gray">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-brand-black">Admin Panel</h1>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowSettings(true)}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-8 border-t">
            <button
              onClick={() => setActiveSection("dashboard")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeSection === "dashboard"
                  ? "border-brand-black text-brand-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveSection("new-arrivals")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeSection === "new-arrivals"
                  ? "border-brand-black text-brand-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => setActiveSection("discounts")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeSection === "discounts"
                  ? "border-brand-black text-brand-black"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Discounts
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === "dashboard" && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Package className="w-8 h-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Products</p>
                      <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">₹</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Inventory Value</p>
                      <p className="text-2xl font-bold text-gray-900">₹{totalValue.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <AlertTriangle className="w-8 h-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Low Stock</p>
                      <p className="text-2xl font-bold text-gray-900">{lowStockProducts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <ShoppingCart className="w-8 h-8 text-red-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                      <p className="text-2xl font-bold text-gray-900">{outOfStockProducts}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex gap-4">
                <Button onClick={() => setShowProductForm(true)} className="bg-brand-black hover:bg-gray-800">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Product
                </Button>
              </div>

              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Table */}
            <Card>
              <CardHeader>
                <CardTitle>Products ({filteredProducts.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Product</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Price</th>
                        <th className="text-left p-4">Stock</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{product.name}</p>
                                <div className="flex gap-1 mt-1">
                                  {product.isNew && <Badge className="bg-green-500 text-white text-xs">New</Badge>}
                                  {product.isBestseller && (
                                    <Badge className="bg-orange-500 text-white text-xs">Bestseller</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 capitalize">{product.category.replace("-", " ")}</td>
                          <td className="p-4">
                            <div>
                              <span className="font-bold">₹{product.price}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through ml-2">
                                  ₹{product.originalPrice}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-medium ${
                                  product.stock === 0
                                    ? "text-red-600"
                                    : product.stock < 5
                                      ? "text-yellow-600"
                                      : "text-green-600"
                                }`}
                              >
                                {product.stock}
                              </span>
                              {product.stock === 0 && <AlertTriangle className="w-4 h-4 text-red-600" />}
                              {product.stock > 0 && product.stock < 5 && (
                                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {product.isAvailable ? (
                                <>
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span className="text-green-600">Available</span>
                                </>
                              ) : (
                                <>
                                  <AlertTriangle className="w-4 h-4 text-red-600" />
                                  <span className="text-red-600">Unavailable</span>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeSection === "new-arrivals" && (
          <NewArrivalsManager products={products} onUpdateProducts={onUpdateProducts} />
        )}

        {activeSection === "discounts" && <DiscountManager products={products} onUpdateProducts={onUpdateProducts} />}
      </div>

      {/* Product Form Modal */}
      <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <ProductForm
            product={editingProduct}
            onSave={handleSaveProduct}
            onCancel={() => {
              setShowProductForm(false)
              setEditingProduct(undefined)
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <AdminSettings
              onClose={() => setShowSettings(false)}
              onPasswordChange={handlePasswordChange}
              currentSettings={adminSettings}
              onSettingsUpdate={handleSettingsUpdate}
            />
          </div>
        </div>
      )}
    </div>
  )
}
