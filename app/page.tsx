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
      <div className="flex bg-primary w-full p-4">
        {!session && (
          <div className="flex mx-auto items-center h-screen">
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
          <div className="flex flex-col w-full h-full">
            <Tournaments tournaments={{}} />
          </div>
        )}
      </div>
    </>
  );
}
