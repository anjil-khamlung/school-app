import { Navigate, Outlet } from "react-router-dom"
import { useSchoolStore } from "../store/useSchoolStore"

const GuestRoute = () => {
    const user = useSchoolStore((state) => state.currentUser)
    const isAuthenticated = useSchoolStore((state) => state.isAuthenticated)
    
    if (!isAuthenticated || !user) return <Outlet/>
      
    
        
  return (
    <Navigate to="/" />
  )
}

export default GuestRoute