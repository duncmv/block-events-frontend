"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

interface EventFormData {
  title: string;
  description: string;
  location: string;
  organizerName: string;
  organizerEmail: string;
  organizerAddress: string;
  startDateTime: string;
  endDateTime: string;
  category: string;
  status: string;
  tags: string;
  media: File | null;
}

interface ErrorsProps {
  [key: string]: string | undefined;
  title?: string;
  description?: string;
  location?: string;
  organizerName?: string;
  organizerEmail?: string;
  organizerAddress?: string;
  startDateTime?: string;
  endDateTime?: string;
  category?: string;
  status?: string;
  tags?: string;
  media?: string;
  serverError?: string;
}
const categories = [
  { name: "Select a category" },
  { name: "Art" },
  { name: "Business" },
  { name: "Community" },
  { name: "Culture" },
  { name: "Education" },
  { name: "Fashion" },
  { name: "Food" },
  { name: "Health" },
  { name: "Lifestyle" },
  { name: "Music" },
  { name: "Sports" },
  { name: "Tech" },
  { name: "Travel" },
];

const UpdateEventForm: React.FC = () => {
  const { id } = useParams(); // Fetch event ID from URL
  const [isUpdated, setIsUpdated] = useState(false);
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    location: "",
    organizerName: "",
    organizerEmail: "",
    organizerAddress: "",
    startDateTime: "",
    endDateTime: "",
    category: "",
    status: "",
    tags: "",
    media: null,
  });

  const [errors, setErrors] = useState<ErrorsProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // For spinner
  const [previews, setPreviews] = useState<string[]>([]); // For image previews
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref for file input
  const router = useRouter();

  // Fetch event details by ID
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3300/api/events/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            title: data.title || "",
            description: data.description || "",
            location: data.location || "",
            organizerName: data.organizer.name || "",
            organizerEmail: data.organizer.email || "",
            organizerAddress: data.organizer.address || "",
            startDateTime: data.startDateTime || "",
            endDateTime: data.endDateTime || "",
            category: data.category || "",
            status: data.status || "",
            tags: data.tags.join(", ") || "",
            media: null, // Media is handled separately
          });
          if (data.media) {
            setPreviews([`http://localhost:3300/media/${data.media}`]); // Load image preview from server
          }
        } else {
          throw new Error("Event not found");
        }
      } catch (err) {
        setErrors({
          serverError: "An error occurred while fetching event data.",
        });
      }
    };

    fetchEvent();
  }, [id]);

  function formatDateTimeLocal(dateString: string) {
    if (!dateString) return "";

    let date;
    try {
      date = new Date(dateString);

      // Check if the date is valid
      if (isNaN(date.getTime())) {
        console.error("Invalid date:", dateString);
        return "";
      }

      // Format the date
      return date.toISOString().slice(0, 16);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    window.location.href = "/Dashboard";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevState) => ({
      ...prevState,
      media: file,
    }));

    // Update preview image
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
      const value = formData[key as keyof EventFormData];

      if (key === "media" && value) {
        if (value instanceof File) {
          formDataObj.append("media", value); // Append the single file
        }
      } else if (typeof value === "string") {
        formDataObj.append(key, value);
      }
    });

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3300/api/events/${id}`, {
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
            router.push("/Dashboard");
            // window.location.href = '/Dashboard';
          }, 1500)
        }, 1500)
        // window.location.href = "/Dashboard";
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

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="container my-3 mx-auto p-6 md:p-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-[#8c0327] mb-8 text-center">
        Update Event
      </h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-8"
        noValidate
      >
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event Title"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-4 bg-[#f6f6f6] mt-1"
          />
          {errors?.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-lg font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-4 bg-[#f6f6f6] mt-1"
          >
            {categories.map((category,key) => (
              <option key={key} value={category.name}>
                {category.name}
              </option>
            ))}
            <option value="">Select a category</option>
            </select>
          {errors?.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        {/* Description and Image Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Event Description"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-4 bg-[#f6f6f6] mt-1"
            />
            {errors?.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Event Media
            </label>
            <label
              htmlFor="image-upload"
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
              id="image-upload"
              name="media"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="sr-only"
              ref={fileInputRef}
            />
            {errors?.media && (
              <p className="text-red-500 text-sm mt-1">{errors.media}</p>
            )}
            {previews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {previews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Selected media ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-lg font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Event Location"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-4 bg-[#f6f6f6] mt-1"
          />
          {errors?.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        {/* Organizer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label
              htmlFor="organizerName"
              className="block text-lg font-medium text-gray-700"
            >
              Organizer Name
            </label>
            <input
              type="text"
              id="organizerName"
              name="organizerName"
              value={formData.organizerName}
              onChange={handleChange}
              placeholder="Organizer Name"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-4 bg-[#f6f6f6] mt-1"
            />
            {errors?.organizerName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.organizerName}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="organizerEmail"
              className="block text-lg font-medium text-gray-700"
            >
              Organizer Email
            </label>
            <input
              type="email"
              id="organizerEmail"
              name="organizerEmail"
              value={formData.organizerEmail}
              onChange={handleChange}
              placeholder="Organizer Email"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-4 bg-[#f6f6f6] mt-1"
            />
            {errors?.organizerEmail && (
              <p className="text-red-500 text-sm mt-1">
                {errors.organizerEmail}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="organizerAddress"
            className="block text-lg font-medium text-gray-700"
          >
            Organizer Address
          </label>
          <input
            type="text"
            id="organizerAddress"
            name="organizerAddress"
            value={formData.organizerAddress}
            onChange={handleChange}
            placeholder="Organizer Address"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-4 bg-[#f6f6f6] mt-1"
          />
          {errors?.organizerAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.organizerAddress}
            </p>
          )}
        </div>

        {/* Start and End DateTime */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label
              htmlFor="startDateTime"
              className="block text-lg font-medium text-gray-700"
            >
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              id="startDateTime"
              name="startDateTime"
              value={
                formatDateTimeLocal(formData.startDateTime) ||
                formData.startDateTime
              }
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-4 bg-[#f6f6f6] mt-1"
            />
            {errors?.startDateTime && (
              <p className="text-red-500 text-sm mt-1">
                {errors.startDateTime}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="endDateTime"
              className="block text-lg font-medium text-gray-700"
            >
              End Date & Time
            </label>
            <input
              type="datetime-local"
              id="endDateTime"
              name="endDateTime"
              value={
                formatDateTimeLocal(formData.endDateTime) ||
                formData.endDateTime
              }
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-4 bg-[#f6f6f6] mt-1"
            />
            {errors?.endDateTime && (
              <p className="text-red-500 text-sm mt-1">{errors.endDateTime}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
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
              "Update Event"
            )}
          </button>
          {errors?.serverError && (
            <p className="text-red-500 text-sm mt-4">{errors.serverError}</p>
          )}
        </div>
      </form>
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
          <span>Updated event successfully.</span>
        </div>
      )}
    </div>
  );
};

export default UpdateEventForm;
