import { NavLink } from "react-router-dom";

const Navbar = () => {
  const tabs = [
    { path: "/routes", label: "Routes" },
    { path: "/compare", label: "Compare" },
    { path: "/banking", label: "Banking" },
    { path: "/pooling", label: "Pooling" },
  ];

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex gap-6">
      {tabs.map((t) => (
        <NavLink
          key={t.path}
          to={t.path}
          className={({ isActive }: { isActive: boolean }) =>
            `hover:text-green-400 ${isActive ? "text-green-400 font-semibold" : ""}`
          }
        >
          {t.label}
        </NavLink>

      ))}
    </nav>
  );
};

export default Navbar;
