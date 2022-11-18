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
        <div className="md:h-70 md:w-60 lg:h-96 lg:w-96 rounded cursor-pointer hover:scale-105 transition-all ease-in-out">
            <div className="h-4/6 bg-white bg-opacity-20 backdrop-blur-lg rounded-t-md p-1 ">
                <div
                    style={{
                        backgroundImage:
                            "url('https://nhygifndfvbiyhouicmk.supabase.co/storage/v1/object/public/images/games/halo-infinite.jpg?t=2022-11-15T03%3A14%3A29.994Z')",
                    }}
                    className="bg-no-repeat bg-cover bg-center w-full h-full rounded-t-md"
                ></div>
            </div>
            <div className="flex flex-col gap-1 h-2/6 mt-1 p-2 bg-quaternary bg-opacity-70 backdrop-blur-lg rounded-b-md ">
                <h1 className="font-semibold">{title}</h1>
                <div className="w-full h-[1px] bg-primary center rounded-md"></div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row gap-1">
                            <IoGameControllerOutline className="w-7 h-7 text-white" />
                            <h1>Halo Infinte</h1>
                        </div>

                        <div className="flex flex-row gap-1">
                            <IoMdGlobe className="w-7 h-7" />
                            <h1>South America</h1>
                        </div>
                    </div>

                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row items-center gap-1">
                            <MdDateRange className="w-7 h-7" />
                            <h1>10/25/2022</h1>
                        </div>
                        <div className="flex flex-row items-center gap-1">
                            <AiOutlineClockCircle className="w-7 h-7" />
                            <h1>12:00 PM EST</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
