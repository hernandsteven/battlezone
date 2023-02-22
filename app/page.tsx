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

    interface Filter {
        game?: string;
        region?: string;
        platform?: string;
    }

    const fetchTournaments = async () => {
        let query = supabase.from("tournaments").select();

        // Use an object to store the filter criteria
        let filter: Filter = {};

        if (selectedGame !== "All") {
            filter.game = selectedGame;
        }
        if (selectedRegion !== "All") {
            filter.region = selectedRegion;
        }
        if (selectedPlatform !== "All") {
            filter.platform = selectedPlatform;
        }

        // Apply the filter object to the query
        for (let [key, value] of Object.entries(filter)) {
            // Apply each pair to the query using eq method
            query = query.eq(key, value);
        }
        const { data } = await query.order("date", {
            ascending: true,
        });

        if (data) {
            setTournaments(data);
        }
    };

    useEffect(() => {
        fetchTournaments();
    }, [selectedGame, selectedRegion, selectedPlatform]);

    return (
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
                <div className="flex h-full w-full flex-col">
                    <Filter />
                    <Tournaments tournaments={tournaments} />
                </div>
            )}
        </div>
    );
}
