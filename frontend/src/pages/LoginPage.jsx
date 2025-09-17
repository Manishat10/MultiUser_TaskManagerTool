import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";
import InputForm from "../components/InputForm";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard"); // Redirect on successful login
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(login(form));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6  rounded-md shadow-lg bg-white ">
      <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
      <form onSubmit={handleSubmit} noValidate>
        <InputForm
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputForm
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />
        {error && <p className="text-red-600 mb-2 text-center">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
