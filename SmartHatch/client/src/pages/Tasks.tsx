import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getTasks, updateTask, createTask } from "@/api/tasks"
import { useToast } from "@/hooks/useToast"
import { useForm } from "react-hook-form"
import { Plus, Clock, AlertCircle, CheckCircle2, Calendar, Utensils, Heart, Wrench, Package } from "lucide-react"

export function Tasks() {
  const [tasks, setTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { toast } = useToast()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log("Loading tasks")
        const data = await getTasks()
        setTasks(data.tasks)
      } catch (error) {
        console.error("Error fetching tasks:", error)
        toast({
          title: "Error",
          description: "Failed to load tasks",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [toast])

  const handleTaskToggle = async (taskId: string, completed: boolean) => {
    try {
      console.log("Updating task:", taskId, "completed:", completed)
      await updateTask(taskId, completed)
      setTasks(prev => prev.map(task =>
        task._id === taskId ? { ...task, completed } : task
      ))
      toast({
        title: "Success",
        description: completed ? "Task marked as completed" : "Task marked as pending"
      })
    } catch (error) {
      console.error("Error updating task:", error)
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive"
      })
    }
  }

  const onSubmit = async (data: any) => {
    try {
      console.log("Creating new task:", data)
      const result = await createTask(data)
      setTasks(prev => [...prev, result.task])
      setIsCreateDialogOpen(false)
      reset()
      toast({
        title: "Success",
        description: "Task created successfully"
      })
    } catch (error) {
      console.error("Error creating task:", error)
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive"
      })
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'feeding': return <Utensils className="h-4 w-4" />
      case 'health': return <Heart className="h-4 w-4" />
      case 'maintenance': return <Wrench className="h-4 w-4" />
      case 'production': return <Package className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const pendingTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
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
          Tasks & Reminders
        </h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white/95 backdrop-blur-md">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task or reminder for your farm activities
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  {...register("title", { required: "Title is required" })}
                  className="bg-white/80"
                />
                {errors.title && (
                  <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  {...register("description", { required: "Description is required" })}
                  className="bg-white/80"
                />
                {errors.description && (
                  <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select {...register("priority", { required: "Priority is required" })}>
                    <SelectTrigger className="bg-white/80">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-md">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select {...register("category", { required: "Category is required" })}>
                    <SelectTrigger className="bg-white/80">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-md">
                      <SelectItem value="feeding">Feeding</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                      <SelectItem value="inventory">Inventory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="datetime-local"
                  {...register("dueDate", { required: "Due date is required" })}
                  className="bg-white/80"
                />
                {errors.dueDate && (
                  <p className="text-sm text-red-600 mt-1">{errors.dueDate.message}</p>
                )}
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white">
                  Create Task
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pending Tasks */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-orange-600" />
          <h2 className="text-xl font-semibold text-gray-800">Pending Tasks ({pendingTasks.length})</h2>
        </div>
        
        {pendingTasks.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
              <p className="text-gray-500">No pending tasks at the moment</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <Card key={task._id} className="bg-white/80 backdrop-blur-sm border-l-4 border-l-orange-400 hover:shadow-md transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={(checked) => handleTaskToggle(task._id, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </Badge>
                          <div className="flex items-center gap-1 text-emerald-600">
                            {getCategoryIcon(task.category)}
                            <span className="text-xs capitalize">{task.category}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{task.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {new Date(task.dueDate).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-800">Completed Tasks ({completedTasks.length})</h2>
          </div>
          
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <Card key={task._id} className="bg-white/60 backdrop-blur-sm border-l-4 border-l-green-400 opacity-75">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={(checked) => handleTaskToggle(task._id, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-700 line-through">{task.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className="text-xs bg-green-100 text-green-800 border-green-200">
                            Completed
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-500">
                            {getCategoryIcon(task.category)}
                            <span className="text-xs capitalize">{task.category}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 line-through">{task.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}