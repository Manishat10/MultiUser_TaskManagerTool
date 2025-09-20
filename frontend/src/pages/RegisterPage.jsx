import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/authSlice";
import InputForm from "../components/InputForm";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FormGroup from "../components/FormGroup";
import { login } from "../features/authSlice"; 
const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if(isAuthenticated){
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validate()){
      dispatch(register({name:form.name, email: form.email, password: form.password})).unwrap()
      .then(()=>{
        dispatch(login({email:form.email,password:form.password}));
      })
      .catch(() => {throw new Error("Registration failed")});
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 rounded-md shadow-md bg-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>
      <form onSubmit={handleSubmit} noValidate>
        <FormGroup>
          <InputForm
            label="Name"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
          />
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
          <InputForm
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          {error && <p className="text-red-600 mb-2 text-center">{error}</p>}
          <Button type="submit" className="w-full text-white" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </FormGroup>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default RegisterPage;