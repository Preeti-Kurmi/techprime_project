import axios from "axios";
import React, { useEffect, useState } from "react";

const ProjectListing = () => {
  const [table, setTable] = useState([]);
  const [filteredTable, setFilteredTable] = useState([]);
  const [status, setStatus] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getProjects")
      .then((response) => {
        setTable(response.data);
        setFilteredTable(response.data);
        const savedStatus = JSON.parse(localStorage.getItem("projectStatus"));
        if (savedStatus) {
          setStatus(savedStatus);
        } else {
          const initialStatus = response.data.reduce((acc, project, index) => {
            acc[index] = "Registered";
            return acc;
          }, {});
          setStatus(initialStatus);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the projects!", error);
      });
  }, []);

  const handleStatusChange = (index, newStatus) => {
    const updatedStatus = {
      ...status,
      [index]: newStatus,
    };
    setStatus(updatedStatus);
    localStorage.setItem("projectStatus", JSON.stringify(updatedStatus));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = table.filter((project) =>
      Object.values(project).some((value) =>
        value.toString().toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setFilteredTable(filtered);
  };

  const handleSort = (e) => {
    setSortCriteria(e.target.value);
    const sorted = [...filteredTable].sort((a, b) =>
      a[e.target.value].localeCompare(b[e.target.value])
    );
    setFilteredTable(sorted);
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
              Project Listing
            </span>
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
            <img src="/logo-icon.svg" alt="logo-icon" className="h-10 w-10" />
          </div>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search..."
          className="border rounded py-2 px-4"
        />
        <div>
          <label htmlFor="sortby" className="mr-2">Sort By:</label>
          <select
            id="sortby"
            value={sortCriteria}
            onChange={handleSort}
            className="border rounded py-2 px-4"
          >
            <option value="">Select</option>
            <option value="projectTheme">Project Theme</option>
            <option value="reason">Reason</option>
            <option value="type">Type</option>
            <option value="division">Division</option>
            <option value="category">Category</option>
            <option value="priority">Priority</option>
            <option value="department">Department</option>
            <option value="location">Location</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Project Theme</th>
              <th className="py-2 px-4 border-b">Reason</th>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Division</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Priority</th>
              <th className="py-2 px-4 border-b">Department</th>
              <th className="py-2 px-4 border-b">Location</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTable.map((project, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{project.projectTheme}</td>
                <td className="py-2 px-4 border-b">{project.reason}</td>
                <td className="py-2 px-4 border-b">{project.type}</td>
                <td className="py-2 px-4 border-b">{project.division}</td>
                <td className="py-2 px-4 border-b">{project.category}</td>
                <td className="py-2 px-4 border-b">{project.priority}</td>
                <td className="py-2 px-4 border-b">{project.department}</td>
                <td className="py-2 px-4 border-b">{project.location}</td>
                <td className="py-2 px-4 border-b">
                  <div>
                    <span>{status[index]}</span>
                    <button
                      className="bg-blue-500 text-white py-1 px-2 rounded mx-1"
                      onClick={() => handleStatusChange(index, "Start")}
                    >
                      Start
                    </button>
                    <button
                      className="bg-gray-500 text-white py-1 px-2 rounded mx-1"
                      onClick={() => handleStatusChange(index, "Close")}
                    >
                      Close
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded mx-1"
                      onClick={() => handleStatusChange(index, "Cancel")}
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectListing;
