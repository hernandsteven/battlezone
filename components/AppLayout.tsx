"use client";
import { useSession, useUser } from "@supabase/auth-helpers-react";
import React, { useEffect } from "react";
import Filter from "./Filter";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const session = useSession();
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        {session && (
          <div className="flex flex-row p-1 gap-1 bg-primary border-b border-tertiary">
            <h1 className="font-semibold ">Welcome, </h1>
            <h1 className="font-semibold text-quaternary">{user?.email}</h1>
          </div>
        )}
        <Filter />
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
