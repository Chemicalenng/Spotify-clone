import spotifyLogo from "../images/spotify_logo_white.svg"
import Text from "../components/shared/text"
import { Icon } from '@iconify/react';
import Content from "../components/shared/content";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import AudioProgressBar from "../components/shared/progressbar";


const LoggedHomeContainer = ({ children }) => {
    const navigate = useNavigate();
    const [color, setColor] = useState("text-gray-400 hover:text-white");
    const [isPaused, setIsPaused] = useState(true);
    const [currentTrackSrc, setCurrentTrackSrc] = useState();

    const handleClick = () => {
        setColor((prevClass) => (prevClass === 'text-gray-400 hover:text-white' ? 'bg-button-green' : 'text-gray-400 hover:text-white'));
    }
    const clickOnMymusic = () => {
        navigate("/myMusic");
    }
    const clickOnHome = ()=>{
        navigate("/loggedHome");
    }
    const [playedTrack, setPlayedTrack] = useState(null);

    const playTrack = (tracksrc) => {
        if (playedTrack && tracksrc == currentTrackSrc) {
            playedTrack.play();
        }
        else {
            if (playedTrack) {
                playedTrack.stop();
            }
            let sound = new Howl({
                src: [tracksrc],
                html5: true //track is played using HTML5 audio instead of Web Audio API
            });
            setPlayedTrack(sound);
            setCurrentTrackSrc(tracksrc);
            sound.play();
        }
        setIsPaused(false);
    };
    const pauseTrack = () => {
        playedTrack.pause();
        setIsPaused(true);
    };
    const togglePlayPause = () => {
        if (isPaused) {
            playTrack("https://res.cloudinary.com/dbfagfwgm/video/upload/v1705641480/zwqljbaidnoln9wrcdfw.mp3");
        }
        else {
            pauseTrack();
        }
    };

    return <div className="h-full w-full bg-navbar-black">
        <div className="h-9/10 w-full flex">
            <div className="sidebar-container h-full w-1/6 bg-black cursor-pointer flex flex-col justify-between rounded-lg">
                <div>
                    <div className="sidebar logo p-6">
                        <img src={spotifyLogo} alt="Spotify Logo" width={125}></img>
                    </div>
                    <div className="sidebar_contents py-3" >
                        <Text iconName={"material-symbols:home"} text={"Home"} active onClick={clickOnHome}/>
                        <Text iconName={"uil:search"} text={"Search"} />
                        <Text iconName={"mdi:bookshelf"} text={"Your Library"} />
                        <Text iconName={"mingcute:music-3-line"} text={"My Music"} onClick={clickOnMymusic} />
                    </div>
                    <div className="userArea mt-5 py-2">
                        <Text iconName={"ph:plus-fill"} text={"Create Playlist"} />
                        <Text iconName={"tabler:heart-filled"} text={"Liked Songs"} />
                    </div>
                </div>
                <div className="border border-gray-300 rounded-full w-2/5 mx-6 mb-10 text-white flex items-center justify-center hover:border-white cursor-pointer">
                    <div className="px-1 py-2">
                        <Icon icon="ph:globe" fontSize={25} />
                    </div>
                    <div className="py-2 pr-1">
                        English
                    </div>
                </div>
            </div>
            <div className="h-full w-5/6 ">
                <div className="navbar w-full h-1/10 bg-navbar-black bg-opacity-95 flex items-center justify-end rounded-lg">
                    <div className="w-1/2 flex h-full">
                        <div className="left-content w-2/3 flex items-center justify-around">
                            <Content text="Premium" />
                            <Content text="Support" />
                            <Content text="Download" />
                            <div className="border h-1/2"></div>
                        </div>
                        <div className="right-content w-1/3 flex items-center justify-around h-full">
                            <div onClick={() => navigate("/uploadSong")}>
                                <Content text="Upload Song" />
                            </div>
                            <div className='flex items-center justify-center w-11 h-11 bg-white rounded-full font-semibold cursor-pointer' onClick={() => { navigate("/user") }}>
                                User
                            </div>

                        </div>

                    </div>
                </div>
                <div className="songsDeck bg-songsdeck-black h-9/10 pt-4 p-8 overflow-auto rounded-lg">
                    {children}
                </div>
            </div>
        </div>
        <div className="h-1/10 w-full bg-opacity-80 flex items-center">
            <div className="w-1/4 flex items-center justify-start">
                <div className="pl-4">
                    <img src="https://upload.wikimedia.org/wikipedia/en/e/ec/Ae_Dil_Hai_Mushkil.jpg" width={40} height={40} alt="currentSongThumbnail" />
                </div>
                <div className="text-white pl-4 flex-column items-center justify-center">
                    <div className="font-semibold hover:underline cursor-pointer text-sm">
                        Ae Dil Hai Mushkil
                    </div>
                    <div className="font-small text-gray-300 text-sm hover:underline cursor-pointer">
                        Arijit Singh
                    </div>
                </div>
                <div className="text-gray-300 cursor-pointer pl-5 hover:text-white">
                    <Icon icon="ei:plus" fontSize={25} />
                </div>
            </div>
            <div className="w-1/2 flex-column justify-center mt-2">
                <div className="flex items-center justify-center">
                    <div className={`${color} cursor-pointer pr-5`} >
                        <Icon icon="ph:shuffle-fill" fontSize={21} onClick={handleClick} />
                    </div>
                    <div className="text-gray-400 hover:text-white cursor-default pr-5">
                        <Icon icon="mingcute:skip-previous-fill" fontSize={21} />
                    </div>
                    <div className="text-white pr-5">
                        <Icon icon={isPaused ? "ic:baseline-play-circle" : "gridicons:pause"} fontSize={38} onClick={togglePlayPause} />

                    </div>
                    <div className="text-gray-400 hover:text-white cursor-default pr-5">
                        <Icon icon="basil:skip-next-solid" fontSize={28} />
                    </div>
                    <div className="text-gray-400 hover:text-white cursor-default">
                        <Icon icon="iconamoon:playlist-repeat-song-light" fontSize={21} />
                    </div>
                </div>
                <div className="flex items-center justify-center w-3/4 ml-24 pb-2">
                    <AudioProgressBar
                        tracksrc={"https://res.cloudinary.com/dbfagfwgm/video/upload/v1705641480/zwqljbaidnoln9wrcdfw.mp3"}
                        isPaused={isPaused}
                    />
                </div>
            </div>
            <div className="w-1/4 flex justify-end">
                <div className="text-gray-400 cursor-pointer hover:text-white pr-3" >
                    <Icon icon="ph:microphone-stage-bold" fontSize={20} />
                </div>
                <div className="text-gray-400 cursor-pointer hover:text-white pr-3">
                    <Icon icon="heroicons:queue-list-16-solid" fontSize={20} />
                </div>
                <div className="text-gray-400 cursor-default hover:text-white pr-3">
                    <Icon icon="pixelarticons:audio-device" fontSize={20} />
                </div>
                <div className="text-gray-400 cursor-default hover:text-white pr-24">
                    <Icon icon="lets-icons:sound-min" fontSize={21} />
                </div>

            </div>
        </div>
    </div>
}



export default LoggedHomeContainer;