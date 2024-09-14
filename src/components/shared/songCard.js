import { Icon } from "@iconify/react";
import { useState } from "react";

const SongCard = ({ info, playTrack }) => {
    const [isHovered, setIsHovered] = useState(false);

    

    return <div className="flex hover:bg-gray-500 hover:bg-opacity-20 p-2 rounded-md" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="w-12 h-12 bg-cover bg-center" style={{ backgroundImage: `url(${info.thumbnail})` }}>
            {isHovered && <>
                <div className="text-white flex items-center justify-center pt-3" onClick={() => { playTrack(info.track);}}>
                    <Icon icon="ion:play-sharp" fontSize={25} />
                </div>
            </>}
        </div>
        <div className="flex w-full">
            <div className="text-white pl-3.5 flex-column items-center justify-center w-5/6">
                <div className="font-semibold cursor-default">
                    {info.name}
                </div>
                <div className="font-medium text-gray-300 text-sm hover:underline cursor-pointer">
                    {`${info.artist.firstName} ${info.artist.lastName}`}
                </div>
            </div>
            <div className="w-1/6 flex items-center justify-around">
                {isHovered && (<>
                    <div className="text-gray-300 cursor-pointer hover:text-white">
                        <Icon icon="ei:plus" fontSize={25} />
                    </div>
                </>
                )}
                <div className="text-gray-400 cursor-default">
                    4:29
                </div>
                {isHovered && (<>
                    <div className="text-gray-300 font-extrabold cursor-default hover:text-white">
                        . . .
                    </div>

                </>
                )}
            </div>
        </div>
    </div>
}


export default SongCard;
//The <>...</> syntax is a shorthand for React Fragments. Fragments allow you to group multiple JSX elements without introducing unnecessary parent elements in the DOM. In this case, it's used to wrap the two <div> elements without adding an extra DOM node. JSX allows you to write HTML-like code in your JavaScript files.{isHovered && ...}: This is a conditional rendering expression. It checks whether the isHovered state is true