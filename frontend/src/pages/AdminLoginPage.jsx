import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";
import InputForm from "../components/InputForm";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FormGroup from "../components/FormGroup";

const AdminLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, user } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect admins to admin dashboard
      if (user && user.isAdmin) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        // If regular user tries to access admin login, redirect to user dashboard
        navigate("/dashboard", { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

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
      const lowercaseCredentials = {
        email: form.email.toLowerCase(), 
        password: form.password,
      };
      dispatch(login(lowercaseCredentials));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 rounded-md shadow-lg bg-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">Admin Login</h1>
      <form onSubmit={handleSubmit} noValidate>
        <FormGroup>
          <InputForm
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your admin email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputForm
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your admin password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          {error && <p className="text-red-600 mb-2 text-center">{error}</p>}
          <Button type="submit" className="w-full text-white" disabled={loading}>
            {loading ? "Logging in..." : "Admin Log In"}
          </Button>
        </FormGroup>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm">
          User login?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;