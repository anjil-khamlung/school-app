import { useNavigate } from "react-router-dom";
import { useSchoolStore } from "../store/useSchoolStore";
import { toast } from "react-toastify";

const Home = () => {
  const navigate=useNavigate()
  const logout = useSchoolStore((state) => state.logout)
  const isAuthenticated = useSchoolStore((state) => state.isAuthenticated)
  
  const handleClick = () => {
    
    logout()
    toast.warning("You have been logged out")
    navigate("/login")
  }
  return (
    <div className="min-h-screen flex items-center justify-center text-3xl">
      Home
      {isAuthenticated && (
        <button
          onClick={handleClick}
          className="bg-slate-200 text-2xl cursor-pointer rounded-2xl p-2"
        >
          logout
        </button>
      )}
    </div>
  );
};

export default Home;
