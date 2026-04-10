import { useDispatch } from "react-redux"
import { clearUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(clearUser());
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <span
      className="logout"
      onClick={onLogout}
      title="log out"
    >
      <LogOut size={20} />
    </span>
  )
}

export default Logout
