"use client";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Tournaments from "../components/Tournaments";
import Filter from "../components/Filter";
import { useEffect, useState } from "react";
import useFilterStore from "../stores/filterStore";

export default function Home() {
    const supabase = useSupabaseClient();
    const session = useSession();
    const [tournaments, setTournaments] = useState<any>([]);

    const selectedGame = useFilterStore((state) => state.selectedGame);
    const selectedRegion = useFilterStore((state) => state.selectedRegion);
    const selectedPlatform = useFilterStore((state) => state.selectedPlatform);
    // function that fetches tournaments from supabase

    const fetchTournaments = async () => {
        let query = supabase.from("tournaments").select();

        if (
            selectedGame !== "All" &&
            selectedRegion !== "All" &&
            selectedPlatform !== "All"
        ) {
            query = query
                .eq("game", selectedGame)
                .eq("region", selectedRegion)
                .eq("platform", selectedPlatform);
        } else if (
            selectedGame === "All" &&
            selectedRegion !== "All" &&
            selectedPlatform !== "All"
        ) {
            query = query
                .eq("region", selectedRegion)
                .eq("platform", selectedPlatform);
        } else if (
            selectedGame !== "All" &&
            selectedRegion === "All" &&
            selectedPlatform !== "All"
        ) {
            query = query
                .eq("game", selectedGame)
                .eq("platform", selectedPlatform);
        } else if (
            selectedGame !== "All" &&
            selectedRegion !== "All" &&
            selectedPlatform === "All"
        ) {
            query = query.eq("game", selectedGame).eq("region", selectedRegion);
        } else if (
            selectedGame === "All" &&
            selectedRegion === "All" &&
            selectedPlatform !== "All"
        ) {
            query = query.eq("platform", selectedPlatform);
        } else if (
            selectedGame === "All" &&
            selectedRegion !== "All" &&
            selectedPlatform === "All"
        ) {
            query = query.eq("region", selectedRegion);
        } else if (
            selectedGame !== "All" &&
            selectedRegion === "All" &&
            selectedPlatform === "All"
        ) {
            query = query.eq("game", selectedGame);
        }

        const { data, error } = await query;

        if (data) {
            setTournaments(data);
        }

        if (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTournaments();
    }, [selectedGame, selectedRegion, selectedPlatform]);

    return (
        <>
            <div className="flex min-h-screen w-full bg-primary">
                {!session && (
                    <div className="mx-auto flex h-screen items-center">
                        <Auth
                            supabaseClient={supabase}
                            appearance={{
                                theme: ThemeSupa,
                                style: {
                                    button: {
                                        background: "orange",
                                        borderColor: "orange",
                                    },
                                },
                            }}
                            theme="dark"
                        />
                    </div>
                )}
                {session && (
                    <div className="flex h-full w-full flex-col overflow-auto">
                        <Filter />
                        <Tournaments tournaments={tournaments} />
                    </div>
                )}
            </div>
        </>
    );
}
