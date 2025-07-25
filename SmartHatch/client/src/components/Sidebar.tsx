import { NavLink } from "react-router-dom"
import { 
  Home, 
  BookOpen, 
  CheckSquare, 
  Users, 
  MessageCircle, 
  BarChart3, 
  ShoppingCart,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Learning Hub', href: '/learning', icon: BookOpen },
  { name: 'Tasks & Reminders', href: '/tasks', icon: CheckSquare },
  { name: 'Community', href: '/community', icon: Users },
  { name: 'Expert Consultation', href: '/expert-consultation', icon: MessageCircle },
  { name: 'Farm Reports', href: '/farm-reports', icon: BarChart3 },
  { name: 'Marketplace', href: '/marketplace', icon: ShoppingCart },
  { name: 'Profile', href: '/profile', icon: User },
]

export function Sidebar() {
  return (
    <div className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-white/80 dark:bg-gray-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="flex h-full flex-col overflow-y-auto px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === '/'}
              className={({ isActive }) =>
                cn(
                  "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105",
                  isActive
                    ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 hover:text-emerald-700 dark:hover:text-emerald-300"
                )
              }
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}