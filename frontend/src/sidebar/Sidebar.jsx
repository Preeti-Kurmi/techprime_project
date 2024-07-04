import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const items = [
    { src: "/dashboard.svg", alt: "dashboard", link: "/" },
    {
      src: "/project-listing.svg",
      alt: "project-listing",
      link: "/project-listing",
    },
    { src: "/add-project.svg", alt: "add-project", link: "/add-project" },
    { src: "/log-out.svg", alt: "log-out", link: "/login" },
  ];

  return (
    <div className="w-16 h-full flex flex-col items-center py-4 shadow-md bg-slate-100">
      {items.map((item, index) => (
        <div className="mb-6" key={index}>
          <Link to={item.link}>
            <img
              src={item.src}
              alt={item.alt}
              className="w-8 h-8 hover:opacity-75 hover:bg-blue-500 rounded"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
