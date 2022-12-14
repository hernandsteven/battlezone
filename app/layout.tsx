import "./globals.css";
import { Provider } from "./provider";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.css";

import {
    CookieOptions,
    createServerSupabaseClient as _createServerSupabaseClient,
} from "@supabase/auth-helpers-shared";
import { cookies, headers } from "next/headers";
import AppLayout from "../components/AppLayout";

function createServerSupabaseClient<
    Database = any,
    SchemaName extends string & keyof Database = "public" extends keyof Database
        ? "public"
        : string & keyof Database
>({
    cookieOptions,
}: {
    cookieOptions?: CookieOptions;
} = {}) {
    if (
        !process.env.NEXT_PUBLIC_SUPABASE_URL ||
        !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
        throw new Error(
            "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env variables are required!"
        );
    }

    return _createServerSupabaseClient<Database, SchemaName>({
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        getRequestHeader: (key) => headers().get(key) ?? undefined,

        getCookie(name) {
            return cookies().get(name)?.value;
        },
        setCookie(name, value, options) {
            // TODO: figure out how to access response object
            // const newSetCookies = filterCookies(
            //   ensureArray(context.res.getHeader('set-cookie')?.toString() ?? []),
            //   name
            // );
            // const newSessionStr = serializeCookie(name, value, {
            //   ...options,
            //   // Allow supabase-js on the client to read the cookie as well
            //   httpOnly: false
            // });
            // context.res.setHeader('set-cookie', [...newSetCookies, newSessionStr]);
        },
        options: {
            global: {
                // fetch // TODO: is this needed?
            },
        },
        cookieOptions,
    });
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase.auth.getSession();

    //console.log(session.data.session, 'from server')
    return (
        <html lang="en">
            {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />
            <body>
                <Provider session={data.session}>
                    <AppLayout children={children} />
                </Provider>
            </body>
        </html>
    );
}
