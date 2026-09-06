import { Outlet } from "react-router-dom"
import DashboardSidebar from "../DashboardSidebar"

const DashboardLayout = () => {
  return (
      <div className="flex min-h-screen bg-slate-50">
          <DashboardSidebar />
          
          <main className="flex-1 p-4">
              <Outlet/>
          </main>
    </div>
  )
}

export default DashboardLayout