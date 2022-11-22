import React from "react";
import TournamentCard from "./TournamentCard";

interface TournamentsProps {
    tournaments: [
        {
            title: string;
            image: string;
            game: string;
            platform: string;
            region: string;
            date: string;
            time: string;
        }
    ];
}

export default function Tournaments({ tournaments }: TournamentsProps) {
    return (
        <div className="flex w-4/6 flex-col items-center self-center p-4">
            <h1 className="p-4 text-center text-3xl font-semibold underline decoration-quaternary underline-offset-8">
                Find Tournaments
            </h1>
            {tournaments.length > 0 ? (
                <section className="mt-4 grid grid-flow-dense grid-cols-2 gap-16">
                    {tournaments.map(
                        ({
                            title,
                            image,
                            game,
                            platform,
                            region,
                            date,
                            time,
                        }) => {
                            return (
                                <TournamentCard
                                    title={title}
                                    image={image}
                                    game={game}
                                    platform={platform}
                                    region={region}
                                    date={date}
                                    time={time}
                                />
                            );
                        }
                    )}
                </section>
            ) : (
                <h1 className="text-2xl font-semibold">
                    Oops, seems like there were no tournaments found
                </h1>
            )}
        </div>
    );
}
