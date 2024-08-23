// pages/login.tsx
"use client";
import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="bg-inherit font-sans leading-normal tracking-normal h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome</h1>
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setIsSignIn(true)}
            className={`w-full py-2 rounded focus:outline-none transition duration-300 ${isSignIn ? 'bg-primary text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignIn(false)}
            className={`w-full py-2 rounded focus:outline-none transition duration-300 ${!isSignIn ? 'bg-primary text-white' : 'bg-gray-300 text-gray-700'}`}
          >
            Sign Up
          </button>
        </div>
        <div className="transition-all duration-500">
          {isSignIn ? <SignInForm /> : <SignUpForm />}
        </div>
        <p className="mt-4 text-center text-gray-700">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="btn btn-primary text-white px-2 py-1 rounded"
          >
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
