import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/authSlice";
import useAsync from "../hooks/useAsync";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, run } = useAsync();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await run(() =>
        axios.post(
          `${import.meta.env.VITE_BASE_API_URL}/api/signIn`,
          form
        )
      );
      console.log("Login response:", response);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        dispatch(setUser(response.data.user));
        toast.success("Logged in successfully")
        navigate("/chat");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        disabled={loading}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        disabled={loading}
      />
      <button onClick={handleLogin} disabled={loading || !form.email.trim() || !form.password.trim()}>
        {loading ? "Logging in..." : "Login"}
      </button>
      <span>
        Don't have an account? <a href="/signUp">Sign up</a>
      </span>
    </div>
  );
};

export default Login;
