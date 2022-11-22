import React from "react";
import TournamentCard from "./TournamentCard";

interface TournamentsProps {
    tournaments: {};
}

export default function Tournaments({ tournaments }: TournamentsProps) {
    return (
        <div className="flex w-4/6 flex-col items-center self-center p-4">
            <h1 className="p-4 text-center text-3xl font-semibold underline decoration-quaternary underline-offset-8">
                Find Tournaments
            </h1>
            <section className="mt-4 grid grid-flow-dense grid-cols-2 gap-16">
                <TournamentCard title="Halo Infinite HCS FFA Tournament" />
                <TournamentCard title="Halo Infinite HCS FFA Tournament" />
                <TournamentCard title="Halo Infinite HCS FFA Tournament" />
                <TournamentCard title="Halo Infinite HCS FFA Tournament" />
                <TournamentCard title="Halo Infinite HCS FFA Tournament" />
                <TournamentCard title="Halo Infinite HCS FFA Tournament" />
                <TournamentCard title="Halo Infinite HCS FFA Tournament" />
                <TournamentCard title="Halo Infinite HCS FFA Tournament" />
                <TournamentCard title="Halo Infinite HCS FFA Tournament" />
            </section>
        </div>
    );
}
