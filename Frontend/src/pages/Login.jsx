import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/signIn`, form);
      console.log(response);
      if(response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/chat");
      }
      alert("something went wrong");
    } catch (error) {
      console.log(error);
      alert("something went wrong", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <input name="email" placeholder="Email" onChange={handleChange} />
      <br /><br />

      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;