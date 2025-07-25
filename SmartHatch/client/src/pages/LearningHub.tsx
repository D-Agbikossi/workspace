import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getLearningModules, downloadModule } from "@/api/learning"
import { useToast } from "@/hooks/useToast"
import { BookOpen, Download, Search, Clock, Star, CheckCircle } from "lucide-react"

export function LearningHub() {
  const [modules, setModules] = useState<any[]>([])
  const [filteredModules, setFilteredModules] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [downloadingIds, setDownloadingIds] = useState<Set<string>>(new Set())
  const { toast } = useToast()

  useEffect(() => {
    const fetchModules = async () => {
      try {
        console.log("Loading learning modules")
        const data = await getLearningModules()
        setModules(data.modules)
        setFilteredModules(data.modules)
      } catch (error) {
        console.error("Error fetching modules:", error)
        toast({
          title: "Error",
          description: "Failed to load learning modules",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchModules()
  }, [toast])

  useEffect(() => {
    let filtered = modules

    if (searchTerm) {
      filtered = filtered.filter(module =>
        module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter(module => module.category === categoryFilter)
    }

    setFilteredModules(filtered)
  }, [modules, searchTerm, categoryFilter])

  const handleDownload = async (moduleId: string) => {
    setDownloadingIds(prev => new Set(prev).add(moduleId))
    try {
      console.log("Downloading module:", moduleId)
      await downloadModule(moduleId)
      setModules(prev => prev.map(module =>
        module._id === moduleId ? { ...module, isDownloaded: true } : module
      ))
      toast({
        title: "Success",
        description: "Module downloaded for offline access"
      })
    } catch (error) {
      console.error("Error downloading module:", error)
      toast({
        title: "Error",
        description: "Failed to download module",
        variant: "destructive"
      })
    } finally {
      setDownloadingIds(prev => {
        const newSet = new Set(prev)
        newSet.delete(moduleId)
        return newSet
      })
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const categories = [...new Set(modules.map(module => module.category))]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
          Learning Hub
        </h1>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {modules.filter(m => m.isDownloaded).length} Downloaded
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search modules..."
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

      {/* Modules Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredModules.map((module) => (
          <Card key={module._id} className="bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-emerald-600" />
                    {module.title}
                  </CardTitle>
                  <CardDescription className="mt-2">{module.description}</CardDescription>
                </div>
                {module.isDownloaded && (
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {module.category}
                </Badge>
                <Badge className={`text-xs ${getDifficultyColor(module.difficulty)}`}>
                  {module.difficulty}
                </Badge>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {module.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  4.8
                </div>
              </div>

              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
                  size="sm"
                >
                  Start Learning
                </Button>
                {!module.isDownloaded && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(module._id)}
                    disabled={downloadingIds.has(module._id)}
                    className="hover:bg-emerald-50"
                  >
                    {downloadingIds.has(module._id) ? (
                      <div className="animate-spin h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredModules.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No modules found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}