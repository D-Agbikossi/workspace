import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getExperts, requestConsultation, getConsultations } from "@/api/experts"
import { useToast } from "@/hooks/useToast"
import { useForm } from "react-hook-form"
import { MessageCircle, Star, Clock, CheckCircle, AlertCircle, Video, Phone, MessageSquare } from "lucide-react"

export function ExpertConsultation() {
  const [experts, setExperts] = useState<any[]>([])
  const [consultations, setConsultations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedExpert, setSelectedExpert] = useState<any>(null)
  const [isConsultationDialogOpen, setIsConsultationDialogOpen] = useState(false)
  const { toast } = useToast()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Loading experts and consultations")
        const [expertsData, consultationsData] = await Promise.all([
          getExperts(),
          getConsultations()
        ])
        setExperts(expertsData.experts)
        setConsultations(consultationsData.consultations)
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load data",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

  const onSubmit = async (data: any) => {
    try {
      console.log("Requesting consultation:", data)
      const consultationData = {
        ...data,
        expertId: selectedExpert._id
      }
      await requestConsultation(consultationData)
      setIsConsultationDialogOpen(false)
      setSelectedExpert(null)
      reset()
      toast({
        title: "Success",
        description: "Consultation request sent successfully"
      })
      // Refresh consultations
      const consultationsData = await getConsultations()
      setConsultations(consultationsData.consultations)
    } catch (error) {
      console.error("Error requesting consultation:", error)
      toast({
        title: "Error",
        description: "Failed to send consultation request",
        variant: "destructive"
      })
    }
  }

  const handleConsultationRequest = (expert: any) => {
    setSelectedExpert(expert)
    setIsConsultationDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800 border-green-200'
      case 'Busy': return 'bg-red-100 text-red-800 border-red-200'
      case 'Away': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

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
          Expert Consultation
        </h1>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          {consultations.length} Consultations
        </Badge>
      </div>

      {/* Available Experts */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Available Experts</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experts.map((expert) => (
            <Card key={expert._id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={expert.avatar} alt={expert.name} />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">
                      {expert.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-800">{expert.name}</CardTitle>
                    <CardDescription className="text-emerald-600">{expert.specialization}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">{expert.rating}</span>
                  </div>
                  <Badge className={`text-xs ${getAvailabilityColor(expert.availability)}`}>
                    {expert.availability}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Experience:</span>
                    <span className="font-medium">{expert.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price/Hour:</span>
                    <span className="font-medium">{expert.pricePerHour} CFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Languages:</span>
                    <span className="font-medium">{expert.languages.join(', ')}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleConsultationRequest(expert)}
                    disabled={expert.availability === 'Busy'}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
                    size="sm"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Consult
                  </Button>
                  <Button variant="outline" size="sm" className="hover:bg-emerald-50">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Consultation History */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Your Consultations</h2>
        {consultations.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No consultations yet</h3>
              <p className="text-gray-500">Start by requesting a consultation with one of our experts</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {consultations.map((consultation) => (
              <Card key={consultation._id} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-emerald-100 text-emerald-700">
                          {consultation.expert.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-gray-900">{consultation.expert.name}</h3>
                        <p className="text-sm text-gray-600">{consultation.expert.specialization}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(consultation.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(consultation.status)}`}>
                      {consultation.status}
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-700">{consultation.message}</p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" className="hover:bg-emerald-50">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      View Chat
                    </Button>
                    {consultation.status === 'Completed' && (
                      <Button variant="outline" size="sm" className="hover:bg-blue-50">
                        <Star className="h-4 w-4 mr-2" />
                        Rate
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Consultation Request Dialog */}
      <Dialog open={isConsultationDialogOpen} onOpenChange={setIsConsultationDialogOpen}>
        <DialogContent className="bg-white/95 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle>Request Consultation</DialogTitle>
            <DialogDescription>
              {selectedExpert && `Request a consultation with ${selectedExpert.name}`}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="consultationType">Consultation Type</Label>
              <Select {...register("consultationType", { required: "Consultation type is required" })}>
                <SelectTrigger className="bg-white/80">
                  <SelectValue placeholder="Select consultation type" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-md">
                  <SelectItem value="general">General Question</SelectItem>
                  <SelectItem value="health">Health Concern</SelectItem>
                  <SelectItem value="business">Business Advice</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="urgency">Urgency Level</Label>
              <Select {...register("urgency", { required: "Urgency level is required" })}>
                <SelectTrigger className="bg-white/80">
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-md">
                  <SelectItem value="low">Low - Within a week</SelectItem>
                  <SelectItem value="medium">Medium - Within 2 days</SelectItem>
                  <SelectItem value="high">High - Within 24 hours</SelectItem>
                  <SelectItem value="urgent">Urgent - ASAP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                {...register("message", { required: "Message is required" })}
                className="bg-white/80 min-h-[100px]"
                placeholder="Describe your question or concern in detail..."
              />
              {errors.message && (
                <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white">
                Send Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}