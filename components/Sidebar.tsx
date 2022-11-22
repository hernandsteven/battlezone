"use client";
import { AiOutlineHome } from "react-icons/ai";
import { TbTournament } from "react-icons/tb";
import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

const Sidebar = () => {
    const supabase = useSupabaseClient();
    const session = useSession();

    return (
        <div className="flex flex-col justify-between bg-tertiary ">
            <div className="">
                <Link href="/" className="flex flex-col items-center p-2">
                    <img
                        className="w-[100px] h-[100px]"
                        src="/battlezone_logo.png"
                    />
                    <h1 className="text-2xl text-center">BattleZone</h1>
                </Link>

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
                    className="border-12 ml-10 mr-10 mb-5 rounded-md border-solid border-primary bg-quaternary p-2 whitespace-nowrap"
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
