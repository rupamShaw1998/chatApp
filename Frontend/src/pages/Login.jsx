import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/authSlice";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/signIn`, form);
      console.log(response);
      if(response.data.token) {
        localStorage.setItem("token", response.data.token);
        dispatch(setUser(response.data.user));
        navigate("/chat");
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log(error);
      alert("something went wrong", error);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>

      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />

      <button onClick={handleLogin}>Login</button>
      <span>Don't have an account? <a href="/signUp">Sign up</a></span>
    </div>
  );
};

export default Login;
