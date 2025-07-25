import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { AuthProvider } from "./contexts/AuthContext"
import { Login } from "./pages/Login"
import { Register } from "./pages/Register"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Layout } from "./components/Layout"
import { Dashboard } from "./pages/Dashboard"
import { LearningHub } from "./pages/LearningHub"
import { Tasks } from "./pages/Tasks"
import { Community } from "./pages/Community"
import { ExpertConsultation } from "./pages/ExpertConsultation"
import { FarmReports } from "./pages/FarmReports"
import { Marketplace } from "./pages/Marketplace"
import { Profile } from "./pages/Profile"
import { BlankPage } from "./pages/BlankPage"

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="learning" element={<LearningHub />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="community" element={<Community />} />
              <Route path="expert-consultation" element={<ExpertConsultation />} />
              <Route path="farm-reports" element={<FarmReports />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<BlankPage />} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App