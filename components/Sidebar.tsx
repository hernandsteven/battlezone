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
        <div className="flex flex-col w-52 rounded-r-md bg-tertiary justify-between ">
            <div>
                <h1 className="p-4 text-3xl">BattleZone</h1>

                <section className="relative flex flex-col text-base mt-4 font-semibold">
                    <Link
                        href="/"
                        className="flex gap-3 items-end w-full flex-row p-6 border-b border-t"
                    >
                        <AiOutlineHome className="text-2xl" />
                        <h1>Home</h1>
                    </Link>
                    <Link
                        href="/create-tournament"
                        className="flex gap-2 w-full flex-row p-6 whitespace-nowrap border-b"
                    >
                        <TbTournament className="text-3xl" />
                        <h1>Create</h1>
                    </Link>
                </section>
            </div>
            {session && (
                <button
                    className="bg-quaternary border-solid border-12 border-primary p-2 ml-10 mr-10 mb-5 rounded-md"
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
