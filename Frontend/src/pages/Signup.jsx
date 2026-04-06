import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/signUp`, form);
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("something went wrong", error);
    }
  };

  return (
    <div className="login">
      <h4>Sign up</h4>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <br />
      <br />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <br />
      <br />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <br />
      <br />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
