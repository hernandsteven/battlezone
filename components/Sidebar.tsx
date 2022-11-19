"use client";
import { AiOutlineHome } from "react-icons/ai";
import { TbTournament } from "react-icons/tb";
import Link from "next/link";
import useSessionStore from "../stores/sessionStore";
import {
    Session,
    useSession,
    useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const supabase = useSupabaseClient();
    const session = useSession();

    return (
        <div className="flex w-52 flex-col justify-between rounded-r-md bg-tertiary ">
            <div>
                <div className="flex flex-row items-center p-2">
                    <div
                        className="w-[60px] h-[60px] border bg-no-repeat bg-cover bg-center rounded"
                        style={{
                            backgroundImage:
                                "url('https://t4.ftcdn.net/jpg/01/71/56/39/360_F_171563970_Ex63Cq1OKJt8rkB9CixPjwx7ye5q5Wm9.jpg')",
                        }}
                    ></div>
                    <h1 className="text-2xl text-center">BattleZone</h1>
                </div>

                <section className="relative mt-4 flex flex-col text-base font-semibold">
                    <Link
                        href="/"
                        className="flex w-full flex-row items-end gap-3 border-b border-t p-6"
                    >
                        <AiOutlineHome className="text-2xl" />
                        <h1>Home</h1>
                    </Link>
                    <Link
                        href="/create-tournament"
                        className="flex w-full flex-row gap-2 whitespace-nowrap border-b p-6"
                    >
                        <TbTournament className="text-3xl" />
                        <h1>Create</h1>
                    </Link>
                </section>
            </div>
            {session && (
                <button
                    className="border-12 ml-10 mr-10 mb-5 rounded-md border-solid border-primary bg-quaternary p-2"
                    onClick={() => {
                        supabase.auth.signOut();
                    }}
                >
                    Sign Out
                </button>
            )}
        </div>
    );
};

export default Sidebar;
