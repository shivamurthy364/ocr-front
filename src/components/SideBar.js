import React, { useState } from "react";
import Home from "../HomePage";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-gray-100 w-64 ${isSidebarOpen ? 'block' : 'hidden'} md:block md:w-1/5`}>
        <div className="p-4">
          <h1 className="text-2xl font-bold">Sidebar</h1>
        </div>
        <ul>
          <li className="p-4 hover:bg-gray-700">Link 1</li>
          <li className="p-4 hover:bg-gray-700">Link 2</li>
          <li className="p-4 hover:bg-gray-700">Link 3</li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1">
        <button className="bg-gray-800 text-gray-100 p-2 md:hidden" onClick={toggleSidebar}>
          {isSidebarOpen ? "Close" : "Open"} Sidebar
        </button>
        <div className="p-4">
       <Home />
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <div className="fixed bottom-0 right-0 mb-4 mr-4 md:hidden">
        <button
          className="bg-gray-800 text-gray-100 p-2 rounded-full"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
