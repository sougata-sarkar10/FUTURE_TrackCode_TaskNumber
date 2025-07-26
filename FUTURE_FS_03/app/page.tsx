"use client"

import { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Heart, Search, ShoppingBag, Star, User, Filter, Package, SearchX, Shield, Settings } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SignInModal } from "@/components/auth/sign-in-modal"
import { ShoppingCart } from "@/components/cart/shopping-cart"
import { OrderHistory } from "@/components/orders/order-history"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { WishlistModal } from "@/components/wishlist/wishlist-modal"
import { AdminLogin } from "@/components/admin/admin-login"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { UserSettings } from "@/components/user/user-settings"

const initialProducts = [
  {
    id: 1,
    name: "Rose Gold Pearl Earrings",
    price: 1999.99,
    originalPrice: 2799.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "earrings",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isBestseller: false,
    colors: ["rose-gold", "silver", "gold"],
    description: "Elegant rose gold pearl earrings perfect for any occasion",
    tags: ["pearl", "rose gold", "elegant", "formal", "wedding"],
    stock: 15,
    isAvailable: true,
  },
  {
    id: 2,
    name: "Butterfly Hair Clips Set",
    price: 999.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "hair-clips",
    rating: 4.6,
    reviews: 89,
    isBestseller: true,
    isNew: false,
    colors: ["pink", "blue", "purple"],
    description: "Adorable butterfly hair clips set for a whimsical look",
    tags: ["butterfly", "hair clips", "cute", "colorful", "set"],
    stock: 8,
    isAvailable: true,
  },
  {
    id: 3,
    name: "Crystal Stud Earrings",
    price: 1499.99,
    originalPrice: 1999.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "earrings",
    rating: 4.9,
    reviews: 156,
    isNew: false,
    isBestseller: false,
    colors: ["clear", "pink", "blue"],
    description: "Sparkling crystal stud earrings that catch the light beautifully",
    tags: ["crystal", "stud", "sparkle", "daily wear", "versatile"],
    stock: 22,
    isAvailable: true,
  },
  {
    id: 4,
    name: "Silk Hair Scrunchies",
    price: 1299.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "hair-accessories",
    rating: 4.7,
    reviews: 203,
    isNew: false,
    isBestseller: false,
    colors: ["pink", "lavender", "mint"],
    description: "Luxurious silk scrunchies gentle on your hair",
    tags: ["silk", "scrunchies", "gentle", "luxury", "hair care"],
    stock: 3,
    isAvailable: true,
  },
  {
    id: 5,
    name: "Charm Bracelet",
    price: 2399.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "bracelets",
    rating: 4.5,
    reviews: 67,
    isNew: true,
    isBestseller: false,
    colors: ["silver", "gold"],
    description: "Beautiful charm bracelet to collect memories",
    tags: ["charm", "bracelet", "collectible", "memories", "gift"],
    stock: 12,
    isAvailable: true,
  },
  {
    id: 6,
    name: "Floral Hair Headband",
    price: 1599.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "hair-accessories",
    rating: 4.4,
    reviews: 45,
    isNew: false,
    isBestseller: false,
    colors: ["white", "pink", "lavender"],
    description: "Delicate floral headband for a romantic touch",
    tags: ["floral", "headband", "romantic", "delicate", "flowers"],
    stock: 0,
    isAvailable: false,
  },
  {
    id: 7,
    name: "Delicate Chain Necklace",
    price: 2699.99,
    originalPrice: 3499.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "necklaces",
    rating: 4.8,
    reviews: 178,
    isBestseller: true,
    isNew: false,
    colors: ["gold", "silver", "rose-gold"],
    description: "Minimalist chain necklace perfect for layering",
    tags: ["chain", "necklace", "minimalist", "layering", "delicate"],
    stock: 18,
    isAvailable: true,
  },
  {
    id: 8,
    name: "Vintage Hair Pins",
    price: 699.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "hair-clips",
    rating: 4.3,
    reviews: 92,
    isNew: false,
    isBestseller: false,
    colors: ["gold", "silver", "bronze"],
    description: "Vintage-inspired hair pins for a classic look",
    tags: ["vintage", "hair pins", "classic", "retro", "antique"],
    stock: 25,
    isAvailable: true,
  },
]

const categories = [
  { id: "all", name: "All Items", count: 8 },
  { id: "earrings", name: "Earrings", count: 2 },
  { id: "hair-clips", name: "Hair Clips", count: 2 },
  { id: "hair-accessories", name: "Hair Accessories", count: 2 },
  { id: "bracelets", name: "Bracelets", count: 1 },
  { id: "necklaces", name: "Necklaces", count: 1 },
]

export default function EcommerceHome() {
  const [products, setProducts] = useState(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cartItems, setCartItems] = useState<any[]>([])
  const [wishlistItems, setWishlistItems] = useState<number[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [admin, setAdmin] = useState<any>(null)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminSettings, setAdminSettings] = useState({
    lowStockThreshold: 5,
    enableLowStockAlerts: true,
    enableOutOfStockHiding: false,
  })

  // Modal states
  const [showSignInModal, setShowSignInModal] = useState(false)
  const [showCartModal, setShowCartModal] = useState(false)
  const [showWishlistModal, setShowWishlistModal] = useState(false)
  const [showOrdersModal, setShowOrdersModal] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [showUserSettings, setShowUserSettings] = useState(false)

  // Enhanced search functionality
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

      // Hide out of stock products if admin setting is enabled
      const isAvailableForDisplay = adminSettings.enableOutOfStockHiding ? product.stock > 0 : product.isAvailable

      if (!searchQuery.trim()) {
        return matchesCategory && isAvailableForDisplay
      }

      const query = searchQuery.toLowerCase()
      const searchableText = [product.name, product.description, product.category, ...product.tags, ...product.colors]
        .join(" ")
        .toLowerCase()

      const matchesSearch = searchableText.includes(query)
      return matchesSearch && matchesCategory && isAvailableForDisplay
    })
  }, [searchQuery, selectedCategory, products, adminSettings])

  // Get wishlist products
  const wishlistProducts = products.filter((product) => wishlistItems.includes(product.id))

  const addToCart = (product: any, quantity = 1) => {
    if (product.stock < quantity) {
      alert("Not enough stock available!")
      return
    }

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity
        if (newQuantity > product.stock) {
          alert("Not enough stock available!")
          return prev
        }
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: newQuantity } : item))
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const buyNow = (product: any) => {
    if (!user) {
      setShowSignInModal(true)
      return
    }
    if (product.stock < 1) {
      alert("Product is out of stock!")
      return
    }
    setCartItems([{ ...product, quantity: 1 }])
    setShowCheckoutModal(true)
  }

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id)
      return
    }

    const product = products.find((p) => p.id === id)
    if (product && quantity > product.stock) {
      alert("Not enough stock available!")
      return
    }

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleWishlist = (productId: number) => {
    setWishlistItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const removeFromWishlist = (productId: number) => {
    setWishlistItems((prev) => prev.filter((id) => id !== productId))
  }

  const handleSignIn = (email: string, password: string) => {
    setUser({ email, name: email.split("@")[0] })
  }

  const handleSignUp = (email: string, password: string, name: string) => {
    setUser({ email, name })
  }

  const handleSignOut = () => {
    setUser(null)
    setCartItems([])
    setWishlistItems([])
    setOrders([])
  }

  const handleAdminLogin = (credentials: { username: string; password: string }) => {
    if (credentials.username === "admin" && credentials.password === "admin123") {
      setAdmin({ username: credentials.username })
      setShowAdminLogin(false)
      return true
    }
    return false
  }

  const handleAdminLogout = () => {
    setAdmin(null)
  }

  const handleCheckout = () => {
    if (!user) {
      setShowSignInModal(true)
      return
    }
    setShowCartModal(false)
    setShowCheckoutModal(true)
  }

  const handlePlaceOrder = (orderData: any) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      status: "pending" as const,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
    }

    // Update stock levels
    const updatedProducts = products.map((product) => {
      const cartItem = cartItems.find((item) => item.id === product.id)
      if (cartItem) {
        return { ...product, stock: product.stock - cartItem.quantity }
      }
      return product
    })
    setProducts(updatedProducts)

    setOrders((prev) => [newOrder, ...prev])
    setCartItems([])
    setShowCheckoutModal(false)
    alert("Order placed successfully! 🎉")
  }

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleUserPasswordChange = (oldPassword: string, newPassword: string) => {
    // Simple password validation for demo
    if (oldPassword === "password123") {
      setUser({ ...user, password: newPassword })
      return true
    }
    return false
  }

  // Show admin dashboard if admin is logged in
  if (admin) {
    return <AdminDashboard products={products} onUpdateProducts={setProducts} onLogout={handleAdminLogout} />
  }

  // Show admin login if requested
  if (showAdminLogin) {
    return <AdminLogin onLogin={handleAdminLogin} />
  }

  return (
    <div className="min-h-screen bg-brand-light-gray">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative w-12 h-12">
                  <Image src="/images/logo.png" alt="Sister Jewellery Wardrobe" fill className="object-contain" />
                </div>
                <span className="text-lg text-brand-black font-semibold hidden sm:block">
                  Sister Jewellery Wardrobe
                </span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search for earrings, hair clips, accessories..."
                  className="pl-10 pr-4 w-full border-gray-200 focus:border-brand-mint focus:ring-brand-mint/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative" onClick={() => setShowWishlistModal(true)}>
                <Heart className={`w-5 h-5 ${wishlistItems.length > 0 ? "text-red-500" : ""}`} />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-mint text-white text-xs flex items-center justify-center">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>

              <Button variant="ghost" size="icon" className="relative" onClick={() => setShowCartModal(true)}>
                <ShoppingBag className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-black text-white text-xs flex items-center justify-center">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled>Hello, {user.name}!</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowUserSettings(true)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowOrdersModal(true)}>
                      <Package className="w-4 h-4 mr-2" />
                      My Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowWishlistModal(true)}>
                      <Heart className="w-4 h-4 mr-2" />
                      Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setShowSignInModal(true)}>
                  Sign In
                </Button>
              )}

              {/* Admin Access */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAdminLogin(true)}
                className="text-gray-500 hover:text-brand-black"
                title="Admin Access"
              >
                <Shield className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-brand-light-mint py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Sister's Sparkle Collection ✨</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover beautiful jewellery and accessories perfect for sisters. From elegant earrings to cute hair clips
              - find your perfect style.
            </p>
            <Button size="lg" className="bg-brand-black hover:bg-gray-800 text-white px-8 py-3">
              Shop New Arrivals
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category.id
                        ? "bg-brand-mint text-brand-black font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <span className="text-sm text-gray-400">({category.count})</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Promotional Banner */}
            <div className="bg-brand-black rounded-lg p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Special Offer! 💖</h3>
              <p className="text-sm mb-4">Get 20% off on orders above ₹4000</p>
              <Button variant="secondary" size="sm" className="w-full">
                Shop Now
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchQuery
                  ? `Search results for "${searchQuery}"`
                  : selectedCategory === "all"
                    ? "All Products"
                    : categories.find((c) => c.id === selectedCategory)?.name}
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">{filteredProducts.length} products found</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Sort by: Featured
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Featured</DropdownMenuItem>
                    <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                    <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                    <DropdownMenuItem>Newest</DropdownMenuItem>
                    <DropdownMenuItem>Best Rating</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 bg-white">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.isNew && <Badge className="bg-green-500 text-white">New</Badge>}
                          {product.isBestseller && <Badge className="bg-orange-500 text-white">Bestseller</Badge>}
                          {product.originalPrice && <Badge className="bg-red-500 text-white">Sale</Badge>}
                          {product.stock === 0 && <Badge className="bg-red-600 text-white">Out of Stock</Badge>}
                          {product.stock > 0 && product.stock <= adminSettings.lowStockThreshold && (
                            <Badge className="bg-yellow-500 text-white">Only {product.stock} Left!</Badge>
                          )}
                          {product.stock > adminSettings.lowStockThreshold && product.stock <= 10 && (
                            <Badge className="bg-blue-500 text-white">{product.stock} Available</Badge>
                          )}
                        </div>

                        {/* Wishlist Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-3 right-3 bg-white/80 hover:bg-white"
                          onClick={() => toggleWishlist(product.id)}
                        >
                          <Heart
                            className={`w-4 h-4 ${wishlistItems.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                          />
                        </Button>

                        {/* Quick Actions */}
                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                          <Button
                            className="w-full bg-white text-gray-900 hover:bg-gray-50"
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                          >
                            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                          </Button>
                          <Button
                            className="w-full bg-brand-black text-white hover:bg-gray-800"
                            onClick={() => buyNow(product)}
                            disabled={product.stock === 0}
                          >
                            {product.stock === 0 ? "Out of Stock" : "Buy Now"}
                          </Button>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

                        {/* Stock Info */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                          </div>
                          <div className="text-right">
                            <span
                              className={`text-xs font-medium ${
                                product.stock === 0
                                  ? "text-red-600"
                                  : product.stock <= adminSettings.lowStockThreshold
                                    ? "text-yellow-600"
                                    : "text-green-600"
                              }`}
                            >
                              {product.stock === 0
                                ? "Out of Stock"
                                : product.stock <= adminSettings.lowStockThreshold
                                  ? `Only ${product.stock} left`
                                  : `${product.stock} in stock`}
                            </span>
                            {product.stock > 0 && (
                              <div className="text-xs text-gray-500">
                                {product.stock <= adminSettings.lowStockThreshold ? "Hurry up!" : "Available"}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Colors */}
                        <div className="flex items-center gap-1 mb-3">
                          {product.colors.map((color, index) => (
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
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg text-gray-900">₹{product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* No Results Found */
              <div className="text-center py-16">
                <SearchX className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">No products found</h3>
                <p className="text-gray-500 text-lg mb-6 max-w-md mx-auto">
                  {searchQuery
                    ? `We couldn't find any products matching "${searchQuery}". Try different keywords or browse our categories.`
                    : "No products found in this category."}
                </p>
                <div className="space-x-4">
                  <Button
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("all")
                    }}
                  >
                    Clear All Filters
                  </Button>
                  <Button className="bg-brand-black hover:bg-gray-800" onClick={() => setSelectedCategory("all")}>
                    Browse All Products
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative w-10 h-10">
                  <Image src="/images/logo.png" alt="Sister Jewellery Wardrobe" fill className="object-contain" />
                </div>
                <span className="text-lg text-brand-black font-semibold">Sister Jewellery Wardrobe</span>
              </div>
              <p className="text-gray-600 text-sm">
                Beautiful jewellery and accessories for sisters everywhere. Quality jewelry and hair accessories that
                make you shine.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Shop</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-brand-black">
                    Earrings
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-black">
                    Hair Clips
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-black">
                    Necklaces
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-black">
                    Bracelets
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-brand-black">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-black">
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-black">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-brand-black">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Newsletter</h3>
              <p className="text-sm text-gray-600 mb-4">Get the latest updates on new arrivals and exclusive offers.</p>
              <div className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="text-sm" />
                <Button size="sm" className="bg-brand-black hover:bg-gray-800">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
            <p>
              &copy; 2024 Sister Jewellery Wardrobe. All rights reserved. Made with 💖 for beautiful sisters everywhere.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SignInModal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />

      <Dialog open={showCartModal} onOpenChange={setShowCartModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Shopping Cart</DialogTitle>
          </DialogHeader>
          <ShoppingCart
            items={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showWishlistModal} onOpenChange={setShowWishlistModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>My Wishlist</DialogTitle>
          </DialogHeader>
          <WishlistModal
            items={wishlistProducts}
            onRemoveFromWishlist={removeFromWishlist}
            onAddToCart={addToCart}
            onBuyNow={buyNow}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showOrdersModal} onOpenChange={setShowOrdersModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order History</DialogTitle>
          </DialogHeader>
          <OrderHistory orders={orders} onViewOrder={(orderId) => console.log("View order:", orderId)} />
        </DialogContent>
      </Dialog>

      <Dialog open={showCheckoutModal} onOpenChange={setShowCheckoutModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
          </DialogHeader>
          <CheckoutForm total={cartTotal} onPlaceOrder={handlePlaceOrder} />
        </DialogContent>
      </Dialog>

      {/* User Settings Modal */}
      {showUserSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <UserSettings
              user={user}
              onClose={() => setShowUserSettings(false)}
              onUpdateUser={setUser}
              onPasswordChange={handleUserPasswordChange}
            />
          </div>
        </div>
      )}
    </div>
  )
}
