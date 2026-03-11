"use client";

import {
  LuUser,
  LuPackage,
  LuLayoutDashboard,
  LuLaptopMinimal,
} from "react-icons/lu";

const menuItems = [
  { name: "Dashboard", icon: LuLayoutDashboard },
  { name: "Products", icon: LuLaptopMinimal },
  { name: "Users", icon: LuUser },
  { name: "Orders", icon: LuPackage },
];


export default function SideMenuAdmin({ menuItems, active, setActive}) {
  return (
    <main className="sidebarConatiner  sticky top-2">
      <h1 className="text-2xl font-semibold text-white text-center mt-4">
        Admin Panel
      </h1>
      <div className="border border-white text-sm mt-2 mb-2"></div>

         <aside className="">

      {menuItems.map(({ key, name, icon: Icon }) => (

        <div
          key={key}
          onClick={() => setActive(key)}
          className={`icons-menu-admin hover-effect ${
            active === key ? "bg-purple-600 text-white" : ""
          }`}
        >
          <Icon className="icons-AdminMenu" />
          <span className="adminMenu-text">{name}</span>

        </div>

      ))}

    </aside>



      {/* <div className=" icons-menu-admin hover-effect">
        <LuLayoutDashboard size={18} className="icons-AdminMenu"/>
       <span className="adminMenu-text"> Dashboards </span>
      </div>
      <div className="icons-menu-admin hover-effect">
        <LuLaptopMinimal size={22} className="icons-AdminMenu"/>
         <span className="adminMenu-text">Products</span>
      </div>
      <div className="icons-menu-admin hover-effect">
        <LuUser size={22} className="icons-AdminMenu" />
         <span className="adminMenu-text">Users</span>
      </div>
      <div className="icons-menu-admin hover-effect">
        <LuPackage size={22} className="icons-AdminMenu" />
         <span className="adminMenu-text">Orders</span>
      </div> */}
    </main>
  );
}
