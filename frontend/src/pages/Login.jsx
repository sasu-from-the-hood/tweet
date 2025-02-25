import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    if (!formData.email || !formData.password) return;
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );
      console.log(res);
      sessionStorage.setItem("accessToken", res.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="flex items-center justify-center pt-20">
      <form onSubmit={handleSubmit} className="border p-4 shadow-2xl">
        <div>
          <label>Email:</label>
          <input
            type="email"
            onChange={handleChange}
            name="email"
            className="border ml-3 w-full"
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            onChange={handleChange}
            name="password"
            className="border ml-3 w-full"
          />
        </div>
        <button
          className="border bg-blue-500 text-white p-1 mt-4 rounded cursor-pointer"
          type="submit"
        >
          Log In
        </button>
        <Link className="block" to="/signin">
          already have an account?{" "}
        </Link>
      </form>
    </div>
  );
}

export default LogIn;
