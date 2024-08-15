import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
interface FormDataProps {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
interface ErrorsProps {
  userName?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  serverError?: string;
}
const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataProps>({
    userName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState<ErrorsProps | null>(null);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const validate = (): ErrorsProps | null => {
    const newErrors: ErrorsProps = {};
    if (formData.userName && (formData.userName.length < 3 || formData.userName.length > 15)) {
      newErrors.userName = 'Username must be between 3 and 15 characters';
    }
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!formData.password || formData.password.length < 8 || formData.password.length > 25) {
      newErrors.password = 'Password must be between 6 and 25 characters';
    }
    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Passwords do not match';
    }
    return Object.keys(newErrors).length > 0 ? newErrors : null;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);
    const validationErrors = validate();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await fetch(`http://localhost:3300/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        // router.push('/dashboard'); // Redirect to dashboard or home page
        // console.log(data);
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          serverError: data.message || 'Registration failed',
        }));
      }
    } catch (err) {
      setErrors(prevErrors => ({
        ...prevErrors,
        serverError: 'An error occurred. Please try again.',
      }));
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
          className={`w-full p-2 border rounded ${errors?.userName ? 'border-red-500' : ''}`}
          placeholder="Enter your username"
        />
        {errors?.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors?.email ? 'border-red-500' : ''}`}
          placeholder="Enter your email"
        />
        {errors?.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors?.password ? 'border-red-500' : ''}`}
          placeholder="Enter your password"
        />
        {errors?.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="passwordConfirm" className="block text-gray-700 mb-2">Confirm Password</label>
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          value={formData.passwordConfirm}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${errors?.passwordConfirm ? 'border-red-500' : ''}`}
          placeholder="Confirm your password"
        />
        {errors?.passwordConfirm && <p className="text-red-500 text-sm">{errors.passwordConfirm}</p>}
      </div>
      {errors?.serverError && <p className="text-red-500 mb-4">{errors.serverError}</p>}
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