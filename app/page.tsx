"use client";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import {
    useSession,
    useSupabaseClient,
    useUser,
} from "@supabase/auth-helpers-react";
import Tournaments from "../components/Tournaments";
import Filter from "../components/Filter";
import { useEffect, useState } from "react";

export default function Home() {
    const supabase = useSupabaseClient();
    const session = useSession();
    const [tournaments, setTournaments] = useState<any>([]);

    // function that fetches tournaments from supabase

    const fetchTournaments = async () => {
        const { data, error } = await supabase
            .from("tournaments")
            .select()
            .order("created_at", { ascending: true });

        if (data) {
            console.log(data);
            setTournaments(data);
        }

        if (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTournaments();
    }, []);

    return (
        <>
            <div className="flex w-full bg-primary">
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
                    <div className="flex h-screen w-full flex-col overflow-auto">
                        <Filter />
                        <Tournaments tournaments={tournaments} />
                    </div>
                )}
            </div>
        </>
    );
}
