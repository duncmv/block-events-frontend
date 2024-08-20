"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

interface UserFormData {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  bio: string;
  avatar: File | null;
}

interface ErrorsProps {
  [key: string]: string | undefined;
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  bio?: string;
  avatar?: string;
  serverError?: string;
}

const UpdateUserForm: React.FC = () => {
  const { id } = useParams(); // Fetch user ID from URL
  const [formData, setFormData] = useState<UserFormData>({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    bio: "",
    avatar: null,
  });

  const [errors, setErrors] = useState<ErrorsProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
		
        const response = await fetch(`http://localhost:3300/api/users/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            userName: data.user.userName || "",
            firstName: data.user.profile.firstName || "",
            lastName: data.user.profile.lastName || "",
            email: data.user.email || "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            bio: data.user.profile.bio || "",
            avatar: null, // Avatar is handled separately
          });

          if (data.user.profile.avatar) {
            setPreviews([`http://localhost:3300/media/${data.user.profile.avatar}`]);
          }
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        setErrors({ serverError: "An error occurred while fetching user data." });
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevState) => ({
      ...prevState,
      avatar: file,
    }));

    if (file) {
      setPreviews([URL.createObjectURL(file)]);
    } else {
      setPreviews([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors(null);
    setLoading(true);

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof UserFormData];

      if (key === "avatar" && value) {
        if (value instanceof File) {
          formDataObj.append("avatar", value);
        }
      } else if (typeof value === "string") {
        formDataObj.append(key, value);
      }
    });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3300/api/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataObj,
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/Dashboard");
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
        serverError: "An error occurred. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-[#8c0327] mb-6">Update User</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6" noValidate>
        {/* Username */}
        <div className="p-2">
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Username"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
          {errors?.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
        </div>

        {/* First and Last Name */}
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: "#f6f6f6" }}
            />
            {errors?.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
          <div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: "#f6f6f6" }}
            />
            {errors?.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="p-2">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
          {errors?.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Bio */}
        <div className="p-2">
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            placeholder="User Biography"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
          {errors?.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
        </div>

        {/* Avatar Upload */}
        <div className="p-2">
          <label
            htmlFor="avatar"
            className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer flex flex-col items-center justify-center bg-[#f6f6f6] hover:bg-gray-50"
            onClick={openFileDialog}
          >
            {previews.length > 0 ? (
              <img src={previews[0]} alt="Avatar Preview" className="h-36 w-36 rounded-full object-cover" />
            ) : (
              <>
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16v-4a4 4 0 018 0v4m1 4h-6a2 2 0 110-4h6a2 2 0 110 4zm-8 0a2 2 0 104 0H5a2 2 0 100 4z"
                  ></path>
                </svg>
                <p className="text-gray-500 mt-1">Click to upload a new avatar</p>
              </>
            )}
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          {errors?.avatar && <p className="text-red-500 text-sm">{errors.avatar}</p>}
        </div>

        {/* Password Section */}
        <div className="p-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Current Password"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: "#f6f6f6" }}
            />
            {errors?.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword}</p>}
          </div>
          <div>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: "#f6f6f6" }}
            />
            {errors?.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
          </div>
          <div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: "#f6f6f6" }}
            />
            {errors?.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
        </div>

        {/* Server Error Message */}
        {errors?.serverError && <p className="text-red-500 text-sm">{errors.serverError}</p>}

        {/* Submit Button */}
        <div className="p-2">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#8c0327] text-white rounded-md shadow-sm hover:bg-[#760220] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8c0327]"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserForm;
