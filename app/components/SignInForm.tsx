import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface FormDataProps {
  email: string;
  password: string;
}

interface ErrorsProps {
  [key: string]: string | undefined;
  email?: string;
  password?: string;
  serverError?: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataProps>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<ErrorsProps | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);

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
        window.location.href = '/Dashboard';
      } else {
		
        const backendErrors: ErrorsProps = {};
        data.errors.forEach((error: { field: string; message: string }) => {
          backendErrors[error.field] = error.message;
        });

        setErrors(backendErrors);
      }
    } catch (err) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        serverError: 'An error occurred. Please try again.',
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4" noValidate>
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
      {errors?.server && <p className="text-red-500 mb-4">{errors.server}</p>}
      {errors?.serverError && <p className="text-red-500 mb-4">{errors.serverError}</p>}
      <button
        type="submit"
        className="w-full btn btn-primary text-white p-2 rounded"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
