import { useDispatch } from "react-redux"
import { clearUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(clearUser());
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
