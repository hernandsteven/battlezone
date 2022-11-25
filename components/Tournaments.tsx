import React from "react";
import TournamentCard from "./TournamentCard";

interface TournamentsProps {
    tournaments: [
        {
            id: number;
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
        <div className="m-10 flex w-full flex-col items-center self-center">
            <h1 className="p-4 text-center text-3xl font-semibold underline decoration-quaternary underline-offset-8">
                Find Tournaments
            </h1>
            {tournaments.length > 0 ? (
                <section className="mt-4 grid grid-flow-dense grid-cols-2 gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
                    {tournaments.map(
                        ({
                            id,
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
                                    id={id}
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
                <h1 className=" text-2xl font-semibold">
                    Oops, seems like there were no tournaments found
                </h1>
            )}
        </div>
    );
}
