"use client";
import { useSession, useUser } from "@supabase/auth-helpers-react";
import React from "react";
import Sidebar from "./Sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const user = useUser();
    const session = useSession();
    return (
        <div className="flex h-full">
            <Sidebar />
            <div className="flex h-full w-full flex-col bg-primary">
                {session && (
                    <div className="flex flex-row gap-1 border-b border-tertiary bg-primary p-1">
                        <h1 className="font-semibold ">Welcome, </h1>
                        <h1 className="font-semibold text-quaternary">
                            {user?.email}
                        </h1>
                    </div>
                )}
                <div className="overflow-auto">{children}</div>
            </div>
        </div>
    );
};

export default AppLayout;
