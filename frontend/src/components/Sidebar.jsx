import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg text-sm font-medium ${
      isActive ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <aside className="w-64 bg-white border-r h-full shadow-sm">
      <nav className="p-4 space-y-2">
        <NavLink to="/dashboard/overview" className={navLinkClass}>
          Overview
        </NavLink>
        <NavLink to="/dashboard/products" className={navLinkClass}>
          All Products
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
