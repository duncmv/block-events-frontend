import React, { useState } from 'react';

interface FormDataProps {
  email: string;
  password: string;
}
const SignInForm = ({ setFormData }: { setFormData: React.Dispatch<React.SetStateAction<FormDataProps>> }) => {
  return (
    <form className="mb-4">
      <div className="mb-4">
        <label htmlFor="signInEmail" className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          id="signInEmail"
          className="w-full p-2 border rounded"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="signInPassword" className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          id="signInPassword"
          className="w-full p-2 border rounded"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full btn btn-primary text-white p-2 rounded"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
