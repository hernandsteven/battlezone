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
            <div className="flex w-full flex-col">
                {session && (
                    <div className="flex flex-row gap-1 bg-primary p-1">
                        <h1 className="font-semibold ">Welcome, </h1>
                        <h1 className="font-semibold text-quaternary">
                            {user?.email}
                        </h1>
                    </div>
                )}
                <div className="overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

export default AppLayout;
