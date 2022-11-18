import { MdDateRange } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoGameControllerOutline } from "react-icons/io5";
import { IoMdGlobe } from "react-icons/io";
interface TournamentCardProps {
    title: string;
    image?: string;
    game?: string;
    platform?: string;
    region?: string;
    date?: string;
    startTime?: string;
}

export default function TournamentCard({
    title,
    image,
    game,
    platform,
    region,
    date,
    startTime,
}: TournamentCardProps) {
    return (
        <div className="md:h-70 cursor-pointer rounded transition-all ease-in-out hover:scale-105 md:w-60 lg:h-96 lg:w-96">
            <div className="h-4/6 rounded-t-md bg-white bg-opacity-20 p-1 backdrop-blur-lg ">
                <div
                    style={{
                        backgroundImage:
                            "url('https://nhygifndfvbiyhouicmk.supabase.co/storage/v1/object/public/images/games/halo-infinite.jpg?t=2022-11-15T03%3A14%3A29.994Z')",
                    }}
                    className="h-full w-full rounded-t-md bg-cover bg-center bg-no-repeat"
                ></div>
            </div>
            <div className="mt-1 flex h-2/6 flex-col gap-1 rounded-b-md bg-quaternary bg-opacity-70 p-2 backdrop-blur-lg ">
                <h1 className="font-semibold">{title}</h1>
                <div className="center h-[1px] w-full rounded-md bg-primary"></div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-1">
                            <IoGameControllerOutline className="h-7 w-7 text-white" />
                            <h1>Halo Infinte</h1>
                        </div>

                        <div className="flex flex-row gap-1">
                            <IoMdGlobe className="h-7 w-7" />
                            <h1>South America</h1>
                        </div>
                    </div>

                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row items-center gap-1">
                            <MdDateRange className="h-7 w-7" />
                            <h1>10/25/2022</h1>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <AiOutlineClockCircle className="h-7 w-7" />
                            <h1>12:00 PM EST</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
