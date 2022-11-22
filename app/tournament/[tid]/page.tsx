"use client";
import React, { FC } from "react";
import { useRouter } from "next/router";

interface TournamentProps {
    params: {
        tid: string;
    };
}

const Tournament: FC<TournamentProps> = ({ params }) => {
    return <div>Tournament {params.tid}</div>;
};

export default Tournament;
