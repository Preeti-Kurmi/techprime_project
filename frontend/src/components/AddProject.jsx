import React, { useState } from "react";
import axios from "axios";

const AddProject = () => {
  const [formData, setFormData] = useState({
    projectTheme: "",
    reason: "Business",
    type: "Internal",
    division: "Filters",
    department: "Strategy",
    category: "Quality A",
    priority: "High",
    startDate: "",
    endDate: "",
    location: "Pune",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/projects", formData);
      console.log("Project saved:", response.data);
      // Handle success (e.g., show a success message or redirect)
    } catch (error) {
      console.error("Error saving project:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="relative w-fit mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="relative mb-6">
        <img
          src="/Header-bg.svg"
          alt="header-bg"
          className="w-full rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <div className="flex items-center">
            <img
              src="/left-arrow.svg"
              alt="left-arrow"
              className="mr-2 h-5 w-5"
            />
            <span className="text-white text-2xl font-bold px-4 py-2 rounded-md">
              Create Project
            </span>
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
            <img src="/logo-icon.svg" alt="logo-icon" className="h-10 w-10" />
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="projectTheme"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Enter Project Theme
          </label>
          <input
            type="text"
            id="projectTheme"
            value={formData.projectTheme}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Reason
            </label>
            <select
              id="reason"
              value={formData.reason}
              onChange={handleChange}
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            >
              <option>Business</option>
              <option>Dealership</option>
              <option>Transport</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Type
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            >
              <option>Internal</option>
              <option>External</option>
              <option>Vendor</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="division"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Division
            </label>
            <select
              id="division"
              value={formData.division}
              onChange={handleChange}
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            >
              <option>Filters</option>
              <option>Compressor</option>
              <option>Pumps</option>
              <option>Glass</option>
              <option>Water Heater</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Department
            </label>
            <select
              id="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            >
              <option>Strategy</option>
              <option>Finance</option>
              <option>Quality</option>
              <option>Maintenance</option>
              <option>Stores</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            >
              <option>Quality A</option>
              <option>Quality B</option>
              <option>Quality C</option>
              <option>Quality D</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Priority
            </label>
            <select
              id="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Start Date as per Project Plan
            </label>
            <input
              type="date"
              id="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              End Date as per Project Plan
            </label>
            <input
              type="date"
              id="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <select
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            >
              <option>Pune</option>
              <option>Mumbai</option>
              <option>Delhi</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <span className="block text-sm font-medium text-gray-700">
            Status: <span className="font-semibold">Registered</span>
          </span>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Save Project
        </button>
      </form>
    </div>
  );
};

export default AddProject;
