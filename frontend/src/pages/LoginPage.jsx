import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // or adjust the path if alias isn't set
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginInfoGraphic from "../assets/8487305.jpg";

const LoginPage = () => {
  const [username, setUsername] = useState(""); // updated from 'email'
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl h-2/3 flex">
        <div className="hidden md:block w-1/2">
          <img
            src={LoginInfoGraphic}
            alt="Login Graphic"
            className="w-full h-full object-cover rounded-l-2xl"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900">Inventory Login</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-700">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="focus-visible:ring-2 focus-visible:ring-purple-600"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus-visible:ring-2 focus-visible:ring-purple-600"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" type="submit">
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center">
            <a href="/public" className="text-purple-600 hover:underline">
              Go Unlogged In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
