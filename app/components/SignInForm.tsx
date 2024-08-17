import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
interface FormDataProps {
  email: string;
  password: string;
}
interface ErrorsProps {
  email?: string;
  password?: string;
  serverError?: string;
}
const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataProps>({
    email: '',
    password: '',
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
    
    if (!formData.email || !validateEmail(formData.email)) {
      newErrors.email = 'Email is not valid';
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
      const response = await fetch(`http://localhost:3300/api/auth/login`, {
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
        window.location.href = '/Dashboard'; // Redirect to dashboard or home page
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
    <form className="mb-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="signInEmail" className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          id="signInEmail"
          className="w-full p-2 border rounded"
          placeholder="Enter your email"
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        {errors?.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="signInPassword" className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          id="signInPassword"
          className="w-full p-2 border rounded"
          placeholder="Enter your password"
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      {errors?.serverError && <p className="text-red-500 mb-4">{errors.serverError}</p>}
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
