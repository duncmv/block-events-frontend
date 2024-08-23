"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";

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
  const [isUpdated, setIsUpdated] = useState(false);
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
  const [formLoading, setformLoading] = useState<boolean>(true); // For form spinner
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
          }else{
			setPreviews([`/media/profile.webp`]);
		  }
        } else {
          throw new Error("User not found");
        }
      } catch (err) {
        setErrors({ serverError: "An error occurred while fetching user data." });
      } finally {
        setformLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (formLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

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
        setTimeout(() => {
          setLoading(false);
          setIsUpdated(true);
          setTimeout(() => {
            setIsUpdated(false);
            router.replace("/Dashboard");
          }, 1500)
        }, 1500)
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
    }
  };

  const openFileDialog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation(); // Stop propagation to prevent multiple triggers
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDeleteAvatar = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3300/api/users/${id}/avatar`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setPreviews([`/media/profile.webp`]); // Update to default image
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          serverError: data.message || "An error occurred while deleting the avatar",
        }));
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

  const handleCancel = () => {
    window.location.href = "/Dashboard";
  };

  return (
    <div className="container my-3 mx-auto p-6 md:p-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-[#8c0327] mb-8 text-center">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6" noValidate>
        {/* Username */}
        <div className="p-2">
		<label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Username
          </label>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
		  <label
              htmlFor="firstName"
              className="block text-lg font-medium text-gray-700"
            >
              First name
            </label>
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
		  <label
              htmlFor="lastName"
              className="block text-lg font-medium text-gray-700"
            >
              Last name
            </label>
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
		<label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              Email
            </label>
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

        


		{/* bio and Image Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* bio */}
          <div>
		  <label
              htmlFor="bio"
              className="block text-lg font-medium text-gray-700"
            >
              Biography
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={5}
              placeholder="Event Description"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-4 bg-[#f6f6f6] mt-1"
            />
            {errors?.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
		  <label className="block text-lg font-medium text-gray-700 mb-2">
              User avatar
            </label>
            <label
              htmlFor="avatar"
              className=" w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer flex flex-col items-center justify-center bg-[#f6f6f6] hover:bg-gray-50"
            >
              <div className="text-center">
                <button
                  type="button"
                  onClick={openFileDialog}
                  className="bg-[#8c0327] hover:bg-[#6b0220] text-white rounded-full py-2 px-6 mb-2"
                >
                  Select from computer
                </button>
                <p className="text-gray-500">or drag photo here</p>
                <p className="text-gray-500 text-sm mt-1">PNG, JPG, SVG</p>
              </div>
            </label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
              ref={fileInputRef}
            />
            {errors?.avatar && (
              <p className="text-red-500 text-sm mt-1">{errors.avatar}</p>
            )}
			{previews.length > 0 && (
            <div className="mt-4 relative">
              {previews.map((preview, index) => (
                <div key={index} className="relative inline-block">
                  <img
                    src={preview}
                    alt={`Selected media ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md  btn-avatar"
                  />
                  <button
                    type="button"
                    onClick={handleDeleteAvatar}
                    className="absolute top-0 right-0 btn-round-avatar bg-red-500 text-white rounded-full"
                    aria-label="Remove Image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          </div>
        </div>


        {/* Current Password */}
        <div className="p-2">
		<label
            htmlFor="currentPassword"
            className="block text-lg font-medium text-gray-700"
          >
            Current password
          </label>
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

        {/* New Password */}
        <div className="p-2">
		<label
            htmlFor="newPassword"
            className="block text-lg font-medium text-gray-700"
          >
            New password
          </label>
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

        {/* Confirm New Password */}
        <div className="p-2">
		<label
            htmlFor="confirmPassword"
            className="block text-lg font-medium text-gray-700"
          >
            Confirmation password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm New Password"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
          {errors?.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        {/* Submit Button */}
        
		<div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={handleCancel}
            className="text-gray-700 hover:bg-gray-200 rounded-full px-6 py-3 shadow"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center justify-center h-12 bg-[#8c0327] text-white text-base font-medium hover:bg-[#6b0220] rounded-full px-6 shadow"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zM2 12a10 10 0 0020 0h-4a6 6 0 01-12 0z"
                ></path>
              </svg>
            ) : (
              "Update Profile"
            )}
          </button>
          {errors?.serverError && (
            <p className="text-red-500 text-sm mt-4">{errors.serverError}</p>
          )}
        </div>
      </form>
      {/* Show alert */}
      {isUpdated && (
        <div
          role="alert"
          className="fixed left-1/2 top-1/2  transform -translate-x-1/2 -translate-y-1/2 z-10 alert alert-success w-80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Updated profile successfully.</span>
        </div>
      )}
    </div>
  );
};

export default UpdateUserForm;
