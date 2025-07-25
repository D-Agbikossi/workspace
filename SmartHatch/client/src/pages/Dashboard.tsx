import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { getDashboardOverview, getDashboardStats } from "@/api/dashboard"
import { useToast } from "@/hooks/useToast"
import { 
  Thermometer, 
  Droplets, 
  Sun, 
  TrendingUp, 
  TrendingDown, 
  Egg, 
  Wheat, 
  AlertTriangle,
  DollarSign
} from "lucide-react"

export function Dashboard() {
  const [overview, setOverview] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Loading dashboard data")
        const [overviewData, statsData] = await Promise.all([
          getDashboardOverview(),
          getDashboardStats()
        ])
        setOverview(overviewData)
        setStats(statsData)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-0 pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
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
          Dashboard
        </h1>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Flock Status: {overview?.healthStatus}
        </Badge>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Egg Production</CardTitle>
            <Egg className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">{stats?.eggProduction?.today}</div>
            <p className="text-xs text-blue-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {stats?.eggProduction?.trend} from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">Feed Consumption</CardTitle>
            <Wheat className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-800">{stats?.feedConsumption?.today}kg</div>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              {stats?.feedConsumption?.trend} from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Mortality Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">{stats?.mortality?.today}</div>
            <p className="text-xs text-orange-600 flex items-center gap-1">
              <TrendingDown className="h-3 w-3" />
              {stats?.mortality?.trend} this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-800">{stats?.revenue?.today} CFA</div>
            <p className="text-xs text-purple-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {stats?.revenue?.trend} from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Weather Card */}
        <Card className="bg-gradient-to-br from-sky-50 to-sky-100 border-sky-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sky-700">
              <Sun className="h-5 w-5" />
              Weather Today
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-sky-600" />
                <span className="text-sm text-sky-700">Temperature</span>
              </div>
              <span className="font-semibold text-sky-800">{overview?.weather?.temperature}°C</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-sky-600" />
                <span className="text-sm text-sky-700">Humidity</span>
              </div>
              <span className="font-semibold text-sky-800">{overview?.weather?.humidity}%</span>
            </div>
            <div className="text-center p-3 bg-sky-200/50 rounded-lg">
              <p className="text-lg font-semibold text-sky-800">{overview?.weather?.condition}</p>
            </div>
          </CardContent>
        </Card>

        {/* Flock Overview */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Flock Overview</CardTitle>
            <CardDescription className="text-green-600">Current flock status and health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-700">Total Birds</span>
              <span className="font-semibold text-green-800">{overview?.flockSize}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-700">Health Status</span>
              <Badge className="bg-green-200 text-green-800">{overview?.healthStatus}</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Pending Tasks</span>
                <span className="font-semibold text-green-800">{overview?.pendingTasks}</span>
              </div>
              <Progress value={(overview?.pendingTasks / 10) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
        <CardHeader>
          <CardTitle className="text-gray-800">Recent Activities</CardTitle>
          <CardDescription>Latest updates from your farm</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {overview?.recentActivities?.map((activity: any) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'feeding' ? 'bg-blue-500' :
                  activity.type === 'health' ? 'bg-red-500' :
                  'bg-green-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{activity.description}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}