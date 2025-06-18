import { Link } from "react-router-dom";
import React, { useState } from "react";
import { MdLogout } from "react-icons/md";
import { FaBars, FaUserCircle, FaHamburger, FaRunning, FaClipboardList, FaHeartbeat, FaTrophy, FaClock } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { GiMeal } from "react-icons/gi";


interface Menu {
  label: string;
  link: string;
  icon: React.ElementType;
  click?: boolean;
}

export default function SidebarLayout() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menus: Menu[] = [
    { label: `Home`, link: "/home", icon: FaUserCircle },
    { label: `Mi salud`, link: "/user-health-data", icon: FaHeartbeat },
    { label: "Mis objetivos", link: "/user-objectives", icon: FaTrophy },
    { label: "Mis comidas", link: "/user-diets", icon: FaHamburger },
    { label: "Mis ejercicios", link: "/user-routines", icon: FaRunning },
    { label: "Mis calorías diarias", link: "/user-daily-calories-goal", icon: FaClock },
    { label: "Cerrar Sesión", link: "/", icon: MdLogout, click: true }
  ];

  async function handleSignOut(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    auth.signOut();
    navigate('/login')
  }

  if (location.pathname === '/signup' || location.pathname === '/login') {
    return null; // Don't render anything if we are on the home(registration) page or log in page
  }

  return (
    <div className="flex bg-gray-300">
      {/* Sidebar */}
      <div
        className={`bg-slate-800 text-white transition-all duration-300
          ${collapsed ? "w-16" : "w-56"} 
          flex flex-col my-3 ml-3 rounded-2xl relative`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {!collapsed && <span className="text-lg font-bold">myFiubaGymBro</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:bg-slate-700 rounded p-2"
            aria-label="Toggle Sidebar"
          >
            {/* {collapsed ? ">" : "<"} */}
            <FaBars size={15} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 px-2">
          {menus.map((menu, idx) => (
            idx === menus.length - 1 ? (
              <Link to={menu.link}
                key={idx}
                className="group relative flex items-center gap-4 px-2 py-2 rounded hover:bg-slate-700 cursor-pointer"
                onClick={() => auth.signOut()}
              >
                {React.createElement(menu?.icon, { size: "25" })}
                {!collapsed && <span>{menu.label}</span>}
              </Link>
            ) : (

              <Link to={menu.link}
                key={idx}
                className="group relative flex items-center gap-4 px-2 py-2 rounded hover:bg-slate-700 cursor-pointer"
                {...(menu?.click && { onClick: handleSignOut })}
              >
                {React.createElement(menu?.icon, { size: "25" })}
                {!collapsed && <span>{menu.label}</span>}
              </Link>)
          ))}
        </nav>
      </div>
    </div>
  );
}
