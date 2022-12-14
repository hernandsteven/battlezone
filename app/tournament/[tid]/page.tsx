"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import {
    SingleEliminationBracket,
    Match,
    SVGViewer as div,
} from "@g-loot/react-tournament-brackets";
import { Match as MatchType } from "@g-loot/react-tournament-brackets/dist/src/types";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

interface TournamentProps {
    params: {
        tid: string;
    };
}

type Tournament = {
    id: number;
    title: string;
    image: string;
    game: string;
    platform: string;
    region: string;
    date: string;
    time: string;
    participantCount: number;
    participants: [
        {
            email: any;
            id: number;
            name: string;
        }
    ];
    description: string;
};

const InitMatches: MatchType[] = [
    {
        id: 1,
        name: "Round 1",
        nextMatchId: 3, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
        tournamentRoundText: "1", // Text for Round Header
        startTime: "2021-05-30",
        state: "TBD", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
        participants: [
            {
                id: "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
                resultText: "N/A", // Any string works
                isWinner: false,
                status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                name: "TBD",
            },
            {
                id: "9ea9ce1a-4794-4553-856c-9a3620c0531b",
                resultText: "N/A",
                isWinner: false,
                status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                name: "TBD",
            },
        ],
    },
    {
        id: 2,
        name: "Round 1",
        nextMatchId: 3, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
        tournamentRoundText: "1", // Text for Round Header
        startTime: "2021-05-30",
        state: "TBD", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
        participants: [
            {
                id: "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
                resultText: "N/A", // Any string works
                isWinner: false,
                status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                name: "TBD",
            },
            {
                id: "9ea9ce1a-4794-4553-856c-9a3620c0531b",
                resultText: null,
                isWinner: false,
                status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                name: "TBD",
            },
        ],
    },
    {
        id: 3,
        name: "Round 2",
        nextMatchId: null, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
        tournamentRoundText: "1", // Text for Round Header
        startTime: "2021-05-30",
        state: "TBD", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
        participants: [
            {
                id: "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc", // Unique identifier of any kind
                resultText: "N/A", // Any string works
                isWinner: false,
                status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
                name: "TBD",
            },
            {
                id: "9ea9ce1a-4794-4553-856c-9a3620c0531b",
                resultText: "N/A",
                isWinner: false,
                status: null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
                name: "TBD",
            },
        ],
    },
];

const SingleElimination = ({ matches }: { matches: any }) => (
    <SingleEliminationBracket
        key={matches}
        matches={matches}
        matchComponent={Match}
        svgWrapper={({ children, ...props }) => {
            console.log(props);
            //console.log(children);
            //children.props.height = "1000px";

            return (
                <div className="flex items-center justify-center overflow-auto rounded-md border-2 border-quaternary">
                    <TransformWrapper>
                        <TransformComponent>{children}</TransformComponent>
                    </TransformWrapper>
                </div>
            );
        }}
    />
);

const Tournament: FC<TournamentProps> = ({ params }) => {
    const supabase = useSupabaseClient();
    const user = useUser();
    const [matches, setMatches] = useState<MatchType[]>(InitMatches);
    const [tournament, setTournament] = useState<Tournament>({} as Tournament);

    const fetchTournament = async (tid: string) => {
        const { data, error } = await supabase
            .from("tournaments")
            .select()
            .eq("id", tid);

        if (error) {
            console.log(error);
        }

        if (data) {
            setTournament(data[0]);
        }
    };

    //function to check if user is already in the tournament
    const isUserInTournament = tournament.participants?.some(
        (participant) => participant.id.toString() === user?.id.toString()
    );

    const joinTournament = async (tid: string) => {
        //check if user is already in the tournament
        if (!isUserInTournament) {
            const tournamentObjectUpdate = {
                participants: [
                    ...tournament.participants,
                    { id: user?.id, email: user?.email },
                ],
            };
            const { error } = await supabase
                .from("tournaments")
                .update(tournamentObjectUpdate)
                .eq("id", tid);

            if (error) {
                console.log(error);
            } else {
                fetchTournament(tid);
                console.log("success");
            }
        } else {
            alert("You are already in this tournament");
        }
    };

    const leaveTournament = async (tid: string) => {
        //check if user is already in the tournament

        if (isUserInTournament) {
            const tournamentObjectUpdate = {
                participants: tournament.participants.filter(
                    (participant) =>
                        participant.id.toString() !== user?.id.toString()
                ),
            };

            const { error } = await supabase
                .from("tournaments")
                .update(tournamentObjectUpdate)
                .eq("id", tid);

            if (error) {
                console.log(error);
            } else {
                fetchTournament(tid);
                console.log("success");
            }
        }
    };

    const createMatchesArray = () => {
        let matches = [];
        if (tournament.participants.length % 2 === 0) {
            //for every two players create a match
            for (let i = 0; i < tournament.participants.length; i += 2) {
                matches.push({
                    id: i,
                    name: `Match ${i}`,
                    nextMatchId:
                        i === tournament.participants.length - 2 ? null : i + 2,
                    tournamentRoundText: "1",
                    startTime: `${tournament.time}`,
                    state: "TBD",
                    participants: [
                        {
                            id: tournament.participants[i].id,
                            resultText: null,
                            isWinner: false,
                            status: null,
                            name: tournament.participants[i].email,
                        },
                        {
                            id: tournament.participants[i + 1].id,
                            resultText: null,
                            isWinner: false,
                            status: null,
                            name: tournament.participants[i + 1].email,
                        },
                    ],
                });
            }
        }
        if (matches.length > 0) {
            setMatches(matches);
        }
    };

    useEffect(() => {
        fetchTournament(params.tid);
    }, []);

    useEffect(() => {
        if (
            tournament &&
            tournament.participants &&
            tournament.participants.length > 0
        ) {
            createMatchesArray();
        }
    }, [tournament]);

    return (
        <div className="flex flex-col items-center gap-8 ">
            <h1 className=" mb-4 text-3xl font-semibold underline decoration-quaternary underline-offset-8">
                Tournament Details
            </h1>

            <section className="flex flex-row justify-center gap-8 whitespace-pre-wrap">
                <img
                    className="h-[500px] w-[500px] rounded-md object-cover"
                    src={tournament.image}
                />
                <div className="flex flex-col">
                    <h1 className="text-3xl font-semibold">
                        {tournament.title}
                    </h1>
                    <h1 className="text-xl font-semibold text-quaternary">
                        {tournament.game}
                    </h1>
                    <hr className="bt-4 border-quaternary" />
                    <h1 className=" mt-2 min-w-[350px] max-w-[350px] text-xl font-semibold">
                        {tournament.description}
                    </h1>
                    <h1 className="mt-2 text-xl text-quaternary">
                        When & Where?
                    </h1>
                    <hr className="bt-4 border-quaternary" />
                    <div className="font-semibold">
                        <h1>{tournament.date}</h1>
                        <h1>{tournament.time}</h1>
                        <h1>{tournament.platform}</h1>
                    </div>
                    <div className="mt-2">
                        <h1 className="text-xl font-semibold text-quaternary">
                            Teams
                        </h1>
                        <hr className="bt-4 border-quaternary" />
                        <div className=" mt-2  w-16 rounded-md bg-quaternary p-1 text-center text-white ">
                            {tournament.participants
                                ? tournament.participants.length
                                : 0}{" "}
                            / {tournament.participantCount}
                        </div>
                    </div>
                    {!isUserInTournament ? (
                        <button
                            onClick={() => joinTournament(params.tid)}
                            className="flex self-center rounded-md bg-green-300 p-2 pl-4 pr-4 text-center text-xl"
                        >
                            Join
                        </button>
                    ) : (
                        <button
                            onClick={() => leaveTournament(params.tid)}
                            className="flex self-center rounded-md bg-red-600 p-2 pl-4 pr-4 text-center text-xl"
                        >
                            Leave
                        </button>
                    )}
                </div>
            </section>

            <div className="flex flex-col items-center">
                <h1 className=" mb-4 text-3xl font-semibold underline decoration-quaternary underline-offset-8">
                    Bracket
                </h1>
                <SingleElimination matches={matches} />
            </div>
        </div>
    );
};

export default Tournament;
