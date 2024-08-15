import React, { useState } from 'react';

interface FormDataProps {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUpForm = ({ setFormData, formData }: FormDataProps) => {
  return (
    <form className="mb-4">
      <div className="mb-4">
        <label htmlFor="signUpName" className="block text-gray-700 mb-2">Username</label>
        <input
          type="text"
          id="signUpName"
          className="w-full p-2 border rounded"
          placeholder="Enter your user name"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="signUpEmail" className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          id="signUpEmail"
          className="w-full p-2 border rounded"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="signUpPassword" className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          id="signUpPassword"
          className="w-full p-2 border rounded"
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="signUpConfirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
        <input
          type="password"
          id="signUpConfirmPassword"
          className="w-full p-2 border rounded"
          placeholder="Confirm your password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full btn btn-primary text-white p-2 rounded"
        onClick={() => console.log(formData)}
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
