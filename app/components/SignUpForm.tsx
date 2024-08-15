// components/SignUpForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormDataProps {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const SignUpForm = () => {
  const [formData, setFormData] = useState<FormDataProps>({
    userName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.passwordConfirm) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
		credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        localStorage.setItem('token', data.token);
		console.log(data)
        // router.push('/dashboard'); // Redirect to dashboard or home page
      } else {
        // Registration failed
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-4">
        <label htmlFor="userName" className="block text-gray-700 mb-2">Username</label>
        <input
          type="text"
          id="userName"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter your username"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="passwordConfirm" className="block text-gray-700 mb-2">Confirm Password</label>
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Confirm your password"
          required
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        type="submit"
        className="w-full btn btn-primary text-white p-2 rounded"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
