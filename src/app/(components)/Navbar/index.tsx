"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed,setCapsules, setReloadTable } from "@/state";
//import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React,{useState,useEffect} from "react";
import { Button } from 'primereact/button';
import SearchForm from '../Search'

import {  useGetCapsulesQuery,useLazySearchCapsulesQuery } from "@/state/api";


const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const [ trigger ,{data: products, isError, isLoading} ] =  useLazySearchCapsulesQuery();

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

    // useEffect(()=>{
        
    //           dispatch(setCapsules(products));
    //           dispatch(setReloadTable(false));
          
    // },[products ,isLoading])




    const [searchResult, setSearchResult] = useState('');

    // const handleSearchSubmit = async (query) => { 
      
    //   await  trigger(query);
    // };


  return (
    <div className="flex justify-between items-center w-full mb-7 border-0">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
         <Button icon="pi pi-align-justify" onClick={toggleSidebar} className=" px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"/>
         <SearchForm onSubmit={()=>{}} />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-0 border-0 ps-60">
        <div className="hidden md:flex  items-center gap-0 border-0">
          <div className="border-0">
              {isDarkMode ? (
                <Button icon="pi pi-moon" className="cursor-pointer text-gray-500" size="small" onClick={toggleDarkMode}/>
              ) : (
                <Button icon="pi pi-sun" className="cursor-pointer text-gray-500" size="small" onClick={toggleDarkMode} />
              )}
          </div>
          <div className="relative">
            <Button icon="pi pi-bell" className="cursor-pointer text-gray-500" size='small' />
            <span className="absolute -top-2 -right-0 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
        </div>
        <Link href="/settings">
          <Button icon="pi pi-cog" className="cursor-pointer text-gray-500" size="small" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
