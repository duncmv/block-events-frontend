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

const UpdateEventForm: React.FC = () => {
  const { id } = useParams(); // Fetch event ID from URL
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
        setErrors({ serverError: "An error occurred while fetching event data." });
      }
    };

    fetchEvent();
  }, [id]);

  function formatDateTimeLocal(dateString: string) {
	if (!dateString) return '';
  
	let date;
	try {
	  date = new Date(dateString);
	  
	  // Check if the date is valid
	  if (isNaN(date.getTime())) {
		console.error('Invalid date:', dateString);
		return '';
	  }
	  
	  // Format the date
	  return date.toISOString().slice(0, 16);
	} catch (error) {
	  console.error('Error formatting date:', error);
	  return '';
	}
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name.includes('Date') ? new Date(value) : value,
    }));
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
        window.location.href = "/Dashboard";
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
      <h1 className="text-3xl font-bold text-[#8c0327] mb-6">Update Event</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6" noValidate>
        {/* Title */}
        <div className="p-2">
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Event Title"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
          {errors?.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Category */}
        <div className="p-2">
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          >
            <option value="">Select a category</option>
            <option value="music">Music</option>
            <option value="sports">Sports</option>
            <option value="arts">Arts</option>
            <option value="technology">Technology</option>
          </select>
          {errors?.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>

        {/* Description and Image Upload */}
        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Description */}
          <div>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Event Description"
              className="block w-full h-48 rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
              style={{ backgroundColor: "#f6f6f6" }}
            />
            {errors?.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image-upload"
              className="block w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer flex flex-col items-center justify-center bg-[#f6f6f6] hover:bg-gray-50"
            >
              <div className="text-center">
                <div className="mb-2">
                  <button
                    type="button"
                    onClick={openFileDialog}
                    className="bg-[#8c0327] hover:bg-[#6b0220] text-white rounded-full py-2 px-4"
                  >
                    Select from computer
                  </button>
                </div>
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
            {errors?.media && <p className="text-red-500 text-sm">{errors.media}</p>}
            {/* Image Previews */}
            {previews.length > 0 && (
              <div className="mt-4">
                {previews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Selected media ${index + 1}`}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
		{/* Location */}
        <div className="p-2">
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Event Location"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
          {errors?.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>
		
		{/* Organizer Info */}
		<div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <input
            type="text"
            id="organizerName"
            name="organizerName"
            value={formData.organizerName}
            onChange={handleChange}
            placeholder="Organizer Name"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
          {errors?.organizerName && <p className="text-red-500 text-sm">{errors.organizerName}</p>}
        </div>

        <div>
          <input
            type="email"
            id="organizerEmail"
            name="organizerEmail"
            value={formData.organizerEmail}
            onChange={handleChange}
            placeholder="Organizer Email"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
          {errors?.organizerEmail && <p className="text-red-500 text-sm">{errors.organizerEmail}</p>}
        </div>
		</div>
        <div className="p-2">
          <input
            type="text"
            id="organizerAddress"
            name="organizerAddress"
            value={formData.organizerAddress}
            onChange={handleChange}
            placeholder="Organizer Address"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
          {errors?.organizerAddress && (
            <p className="text-red-500 text-sm">{errors.organizerAddress}</p>
          )}
        </div>

        {/* Other fields */}
        {/* Start DateTime */}
		<div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div >
          <input
            type="datetime-local"
            id="startDateTime"
            name="startDateTime"
            value={formatDateTimeLocal(formData.startDateTime) || formData.startDateTime}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
          {errors?.startDateTime && <p className="text-red-500 text-sm">{errors.startDateTime}</p>}
        </div>

        {/* End DateTime */}
        <div>
          <input
            type="datetime-local"
            id="endDateTime"
            name="endDateTime"
            value={formatDateTimeLocal(formData.endDateTime) || formData.endDateTime}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
          {errors?.endDateTime && <p className="text-red-500 text-sm">{errors.endDateTime}</p>}
        </div>
		</div>

        

        

        

        {/* Tags */}
        <div className="p-2">
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          />
          {errors?.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
        </div>

		  {/* Status */}
		  <div className="p-2">
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8c0327] focus:ring-[#8c0327] focus:ring-opacity-50 p-2"
            style={{ backgroundColor: "#f6f6f6" }}
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {errors?.status && <p className="text-red-500 text-sm">{errors.status}</p>}
        </div>

        {/* Submit Button */}
        <div className="p-2">
          <button
            type="submit"
            className={`w-full bg-[#8c0327] hover:bg-[#6b0220] text-white py-2 px-4 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Event"}
          </button>
          {errors?.serverError && <p className="text-red-500 text-sm mt-4">{errors.serverError}</p>}
        </div>
      </form>
    </div>
  );
};

export default UpdateEventForm;
