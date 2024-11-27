import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { MdDashboard } from "react-icons/md";
import { PopoverContent } from "@radix-ui/react-popover";
import { Popover, PopoverTrigger } from "@/components/ui/popover";

const RootLayout = () => {

  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col sm:flex-row border rounded-lg m-10 ">

        <div className="gap-5  p-5 sm:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button><MdDashboard></MdDashboard></Button>
            </PopoverTrigger>
            <PopoverContent className="relative left-10 mt-2 p-2 border rounded-lg bg-white shadow-md">
              <div className="flex ">
                 <Sidebar />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className={` flex border rounded-lg m-5 hidden sm:block `}>
          <Sidebar />
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
