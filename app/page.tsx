"use client";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import {
    useSession,
    useSupabaseClient,
    useUser,
} from "@supabase/auth-helpers-react";
import Tournaments from "../components/Tournaments";

export default function Home() {
    const supabase = useSupabaseClient();
    const session = useSession();

    return (
        <>
            <div className="flex w-full bg-primary p-4">
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
                        <Tournaments tournaments={{}} />
                    </div>
                )}
            </div>
        </>
    );
}
