"use client";
import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { confirmDialog } from "primereact/confirmdialog"; // To use confirmDialog method
import { ConfirmDialog } from "primereact/confirmdialog"; // To use <ConfirmDialog> tag
import { Toast } from "primereact/toast";

const CreateTournament = () => {
    const supabase = useSupabaseClient();
    const user = useUser();

    const toast = React.useRef<any>(null);

    const showSuccess = () => {
        toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Your tournament has been created",
            life: 3000,
        });
    };

    const showError = (err: any) => {
        toast.current.show({
            severity: "error",
            summary: "Error Message",
            detail: `${err}`,
            life: 3000,
        });
    };

    const regionOptions = [
        { label: "Australia", value: "Australia" },
        { label: "Asia", value: "Asia" },
        { label: "Europe", value: "Europe" },
        { label: "North America", value: "North America" },
        { label: "South America", value: "South America" },
    ];
    const [gameImages, setGameImages] = useState(new Map());
    const [gameOptions, setGameOptions] = useState<any>();
    const [platformOptions, setPlatformOptions] = useState<any>();

    const [title, setTitle] = useState("");
    const [game, setGame] = useState("");
    const [platform, setPlatform] = useState("");
    const [region, setRegion] = useState("");
    const [date, setDate] = useState<any>();
    const [time, setTime] = useState<any>();
    const [participantCount, setParticipantCount] = useState<any>(6);

    const [isPlatformDisabled, setPlaformDisabled] = useState(true);
    const [isCreateButtonDisabled, setCreateButtonDisabled] = useState(true);
    const [isTimeDisabled, setTimeDisabled] = useState(true);

    const confirm = () => {
        confirmDialog({
            message: "Are you sure you want to proceed?",
            header: "Create Tournament",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                createTournament();
            },
            reject: () => {},
        });
    };

    const fetchGames = async () => {
        const { data, error } = await supabase
            .from("games")
            .select()
            .order("title", { ascending: true });

        if (data) {
            let games: { label: any; value: number }[] = [];
            let gameImagesDict = new Map();

            data.map(({ title, image }, idx) => {
                games.push({ label: title, value: title });
                gameImagesDict.set(title, image);
            });
            setGameImages(gameImagesDict);
            setGameOptions(games);
        }

        if (error) {
            console.log(error);
        }
    };
    const fetchPlatforms = async () => {
        const { data, error } = await supabase
            .from("games")
            .select("platforms")
            .eq("title", game)
            .order("platforms", { ascending: true });

        if (data) {
            let platformsArr: { label: string; value: string }[] = [];

            data.map(({ platforms }) => {
                platforms.map((plat: string) => {
                    platformsArr.push({ label: plat, value: plat });
                });
            });

            setPlatformOptions(platformsArr);
        }

        if (error) {
            console.log(error);
        }
    };

    const createTournament = async () => {
        const tournamentData = {
            user_id: user?.id,
            title: title,
            image: gameImages.get(game),
            game: game,
            region: region,
            platform: platform,
            date: date,
            time: time.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false,
            }),
            participantCount: participantCount,
        };

        const { error } = await supabase
            .from("tournaments")
            .insert(tournamentData);

        if (error) {
            console.log(error);
            showError(error);
        } else {
            showSuccess();
            resetDropdowns();
        }
    };

    const handleCreateTournament = () => {
        confirm();
    };

    const resetDropdowns = () => {
        setGame("");
        setPlatform("");
        setRegion("");
        setDate("");
        setTime("");
        setTitle("");
        setParticipantCount(4);
    };

    useEffect(() => {
        fetchGames();
    }, []);

    useEffect(() => {
        if (game !== "") {
            setPlaformDisabled(false);
        } else {
            setPlaformDisabled(true);
        }

        fetchPlatforms();
    }, [game]);

    useEffect(() => {
        if (date) {
            setTimeDisabled(false);
        } else {
            setTimeDisabled(true);
        }
        setTime(null);
    }, [date]);

    useEffect(() => {
        if (title && game && platform && region && date && time) {
            setCreateButtonDisabled(false);
        } else {
            setCreateButtonDisabled(true);
        }
    }, [title, game, platform, region, date, time]);

    return (
        <div className="flex h-screen w-full flex-col items-center gap-8 bg-primary p-4">
            <Toast ref={toast} />
            <h1 className="text-3xl font-semibold underline decoration-quaternary underline-offset-8">
                Create Tournament
            </h1>

            <div className="grid grid-flow-row grid-cols-3 grid-rows-3 gap-16">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl ">Title</h1>
                    <InputText
                        className="w-48"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g) Halo HCS FFA "
                        maxLength={30}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl ">Game</h1>
                    <Dropdown
                        className="w-48"
                        placeholder="Select Game"
                        value={game}
                        options={gameOptions}
                        onChange={(e) => setGame(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl ">Participants</h1>
                    <InputNumber
                        className="w-48"
                        value={participantCount}
                        pattern="^\d*[02468]$"
                        showButtons
                        min={4}
                        max={100}
                        onChange={(e) => setParticipantCount(e.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl ">Region</h1>
                    <Dropdown
                        className="w-48"
                        placeholder="Select Region"
                        value={region}
                        options={regionOptions}
                        onChange={(e) => setRegion(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl ">Platform</h1>
                    <Dropdown
                        disabled={isPlatformDisabled}
                        className="w-48"
                        placeholder="Select Region"
                        value={platform}
                        options={platformOptions}
                        onChange={(e) => setPlatform(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl ">Start Date</h1>
                    <Calendar
                        className="w-48"
                        showIcon
                        minDate={new Date()}
                        value={date}
                        onChange={(e) => setDate(e.value)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl ">Start Time</h1>
                    <Calendar
                        disabled={isTimeDisabled}
                        className="w-48"
                        icon="pi pi-clock"
                        showIcon
                        timeOnly
                        minDate={date}
                        showTime
                        hourFormat="12"
                        value={time}
                        onChange={(e) => {
                            setTime(e.value);
                        }}
                    />
                </div>
            </div>
            <Button
                disabled={isCreateButtonDisabled}
                onClick={() => handleCreateTournament()}
                label="Create Tournament"
            />
            <ConfirmDialog />
        </div>
    );
};

export default CreateTournament;
