"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { Button } from 'primereact/button';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";


interface SidebarLinkProps {
  href: string;
  icon: string;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({href,icon,label,isCollapsed,}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center border-1 w-full ${isCollapsed ? "justify-center py-4" : "justify-start px-4 gap-3  py-4"}
          hover:text-blue-500 hover:bg-blue-100 transition-colors  ${isActive ? "bg-blue-200 text-white" : ""} }`}
        >
        <Button icon={icon} className={`h-10 !text-gray-700 border-0 ${ isCollapsed ?"w-7":"w-1"}`}  />

        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700 border-0`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40 border-0`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-4 ${
          isSidebarCollapsed ? "px-5" : "px-3"
        } border-0`}
      >
        {/* <Image
          src=""
          alt="logo"
          width={27}
          height={27}
          className="rounded w-8 border-2"
        /> */}
        <h1
          className={`${
            isSidebarCollapsed ? "hidden" : "block"
          } font-extrabold text-2xl border-0`}
        >
         CheckList
        </h1>

        {/* <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        > */}
          {/* <Menu className="w-4 h-4" /> */}
          
        <Button icon="pi pi-align-justify"  onClick={toggleSidebar} 
         className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"/>
        {/* </button> */}
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-0 border-1 justify-center align-center">
     
        <SidebarLink
          href="/dashboard"
          icon={'pi pi-home'}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          icon={'pi pi-address-book'}
          label="Inventory"
          isCollapsed={isSidebarCollapsed}
        />
         <SidebarLink
          href="/product"
          icon={'pi pi-box'}
          label="Products"
          isCollapsed={isSidebarCollapsed}
        />
        {/* <SidebarLink
          href="/users"
          icon={'pi pi-user'}
          label="Users"
          isCollapsed={isSidebarCollapsed}
        /> */}
        <SidebarLink
          href="/settings"
          icon={'pi pi-cog'}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">&copy; 2024 CheckList</p>
      </div>
    </div>
  );
};

export default Sidebar;
