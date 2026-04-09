import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAsync from "../hooks/useAsync";
import toast from "react-hot-toast";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { loading, run } = useAsync();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const response = await run(() => axios.post(`${import.meta.env.VITE_BASE_API_URL}/api/signUp`, form));
      console.log("Sign up repsonse:", response);
      toast.success("Sign in successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong", error);
    }
  };

  return (
    <div className="login">
      <h4>Sign up</h4>
      <input name="username" placeholder="Username" onChange={handleChange} />
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
      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Signing up..." : "Signup"}
      </button>
      <span>Already have an account? <a href="/login">Log in</a></span>
    </div>
  );
};

export default Signup;
