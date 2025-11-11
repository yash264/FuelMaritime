import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = [
    { path: "/routes", label: "Routes" },
    { path: "/compare", label: "Compare" },
    { path: "/banking", label: "Banking" },
    { path: "/pooling", label: "Pooling" },
  ];

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <NavLink to="/" className="text-2xl font-bold text-green-400 tracking-wide">
          Fuel Maritime
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          {tabs.map((t) => (
            <NavLink
              key={t.path}
              to={t.path}
              className={({ isActive }) =>
                `relative transition-colors duration-200 
                ${isActive ? "text-green-400 font-semibold" : "text-gray-300 hover:text-green-400"}`
              }
            >
              {({ isActive }) => (
                <>
                  {t.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-green-400 rounded-full transition-all duration-300"></span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button (SVG-based) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-300 hover:text-green-400 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            // Close (X) icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 flex flex-col space-y-2 px-6 py-4">
          {tabs.map((t) => (
            <NavLink
              key={t.path}
              to={t.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block py-2 transition-colors duration-200 
                ${isActive ? "text-green-400 font-semibold" : "text-gray-300 hover:text-green-400"}`
              }
            >
              {t.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

