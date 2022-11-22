"use client";
import React, { FC } from "react";
import { useRouter } from "next/router";

interface TournamentProps {
    params: {
        tid: string;
    };
}

const Tournament: FC<TournamentProps> = ({ params }) => {
    return <div>page {params.tid}</div>;
};

export default Tournament;
