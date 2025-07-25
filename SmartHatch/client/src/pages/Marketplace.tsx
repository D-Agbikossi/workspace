import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getMarketplaceProducts, createProductListing } from "@/api/marketplace"
import { useToast } from "@/hooks/useToast"
import { useForm } from "react-hook-form"
import { Plus, Search, ShoppingCart, Star, MapPin, Package } from "lucide-react"

export function Marketplace() {
  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { toast } = useToast()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Loading marketplace products")
        const data = await getMarketplaceProducts()
        setProducts(data.products)
        setFilteredProducts(data.products)
      } catch (error) {
        console.error("Error fetching products:", error)
        toast({
          title: "Error",
          description: "Failed to load marketplace products",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [toast])

  useEffect(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(product => product.category === categoryFilter)
    }

    setFilteredProducts(filtered)
  }, [products, searchTerm, categoryFilter])

  const onSubmit = async (data: any) => {
    try {
      console.log("Creating product listing:", data)
      const result = await createProductListing({
        ...data,
        price: parseFloat(data.price)
      })
      setProducts(prev => [result.product, ...prev])
      setIsCreateDialogOpen(false)
      reset()
      toast({
        title: "Success",
        description: "Product listed successfully"
      })
    } catch (error) {
      console.error("Error creating product listing:", error)
      toast({
        title: "Error",
        description: "Failed to create product listing",
        variant: "destructive"
      })
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Feed': return 'bg-green-100 text-green-800 border-green-200'
      case 'Medicine': return 'bg-red-100 text-red-800 border-red-200'
      case 'Products': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Equipment': return 'bg-purple-100 text-purple-800 border-purple-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const categories = [...new Set(products.map(product => product.category))]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          Marketplace
        </h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              List Product
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white/95 backdrop-blur-md">
            <DialogHeader>
              <DialogTitle>List New Product</DialogTitle>
              <DialogDescription>
                Add your product to the marketplace
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Product name is required" })}
                  className="bg-white/80"
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description", { required: "Description is required" })}
                  className="bg-white/80"
                  placeholder="Describe your product..."
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select {...register("category", { required: "Category is required" })}>
                    <SelectTrigger className="bg-white/80">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-md">
                      <SelectItem value="Feed">Feed & Supplements</SelectItem>
                      <SelectItem value="Medicine">Medicine & Vaccines</SelectItem>
                      <SelectItem value="Products">Eggs & Poultry</SelectItem>
                      <SelectItem value="Equipment">Equipment & Tools</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">Price (CFA)</Label>
                  <Input
                    id="price"
                    type="number"
                    {...register("price", { required: "Price is required", min: 1 })}
                    className="bg-white/80"
                    placeholder="0"
                  />
                  {errors.price && (
                    <p className="text-sm text-red-600 mt-1">{errors.price.message}</p>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white">
                  List Product
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/80 backdrop-blur-sm"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-white/80 backdrop-blur-sm">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-md">
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product._id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <Package className="h-12 w-12 text-gray-400" />
              </div>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-gray-800">{product.name}</CardTitle>
                  <CardDescription className="mt-1">{product.description}</CardDescription>
                </div>
                <Badge className={`text-xs ${getCategoryColor(product.category)}`}>
                  {product.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-emerald-600">
                  {product.price.toLocaleString()} CFA
                </div>
                {product.inStock ? (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    In Stock
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800 border-red-200">
                    Out of Stock
                  </Badge>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">{product.seller.name}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs text-gray-500">{product.seller.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <MapPin className="h-3 w-3" />
                  {product.seller.location}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
                  size="sm"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? 'Buy Now' : 'Out of Stock'}
                </Button>
                <Button variant="outline" size="sm" className="hover:bg-emerald-50">
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}