import { useDispatch } from "react-redux"
import { clearUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

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
    >
      Log out
    </span>
  )
}

export default Logout
