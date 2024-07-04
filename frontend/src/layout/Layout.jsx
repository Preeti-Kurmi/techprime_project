import React from "react";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-row h-screen">
      <Sidebar className="w-1/6" />
      <main className="flex-grow p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
