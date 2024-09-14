import spotifyLogo from "../images/spotify_logo_white.svg"
import Text from "../components/shared/text"
import { Icon } from '@iconify/react';
import Content from "../components/shared/content";
import mhm from "../images/mhm.png";
import hhp from "../images/hhp.png";
import indie from "../images/indie.png";
import ipop from "../images/ipop.png"
import bolcen from "../images/bolcen.png"
import hhh from "../images/hhh.png"
import trending from "../images/trending.png"
import pov from "../images/pov.png"
import chill from "../images/chill.png"
import cure from "../images/cure.png"
import hangover from "../images/hangover.png"

const CardData = [{
    title: "Mega Hit Mix",
    description: "A mega mix of 75 favourites from the last few years",
    imgUrl: mhm
},
{
    title: "Hot Hits Punjabi",
    description: "Catch the hottest punjabi tracks",
    imgUrl: hhp
},
{
    title: "Indie Indie",
    description: "Best of the Indie Indie scene",
    imgUrl: indie
},
{
    title: "I-pop superhits",
    description: "Biggest hits from your favourite stars",
    imgUrl: ipop
},
{
    title: "Trending Now",
    description: "Every track you're/should be listening to :)",
    imgUrl: trending
}]

const recentlyPlayed = [{
    title: "Hot Hits Hindi",
    description: "Hottest Hindi music served here",
    imgUrl: hhh
},
{
    title: "Indie Indie",
    description: "Best of the Indie Indie scene",
    imgUrl: indie
},
{
    title: "Hot Hits Punjabi",
    description: "Catch the hottest punjabi tracks",
    imgUrl: hhp
},
{
    title: "Bollywood Central",
    description: "Bollywood Central, jab baje toh seedha dil ke center mein lage 🤍",
    imgUrl: bolcen
},
{
    title: "I-pop superhits",
    description: "Biggest hits from your favourite stars",
    imgUrl: ipop
}]
const recentListening = [{
    title: "pov: you're in love",
    description: "Uff, you have fallen in love 💜",
    imgUrl: pov
},
{
    title: "Bollywood & Chill",
    description: "Sit back, and chill with Bollywood's easygoing hits.",
    imgUrl: chill
},
{
    title: "Hangover Cure",
    description: "Trust us, you need this",
    imgUrl: cure
},
{
    title: "Hot Hits English",
    description: "Hottest English Tracks",
    imgUrl: "https://images.unsplash.com/photo-1548778052-311f4bc2b502?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
},
{
    title: "Filmy Hangover",
    description: "Soothe your Hangover with these chill tracks",
    imgUrl: hangover
}]
const HomeComponent = () => {
    return <div className=" h-full w-full flex">
        <div className="sidebar-container h-full w-1/6 bg-black cursor-pointer flex flex-col justify-between">
            <div>
                <div className="sidebar logo p-6">
                    <img src={spotifyLogo} alt="Spotify Logo" width={125}></img>
                </div>
                <div className="sidebar_contents py-3">
                    <Text iconName={"material-symbols:home"} text={"Home"} active />
                    <Text iconName={"uil:search"} text={"Search"} />
                    <Text iconName={"mdi:bookshelf"} text={"Your Library"} />
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
            <div className="navbar w-full h-1/10 bg-navbar-black bg-opacity-95 flex items-center justify-end">
                <div className="w-1/2 flex h-full">
                    <div className="left-content w-3/5 flex items-center justify-around">
                        <Content text="Premium" />
                        <Content text="Support" />
                        <Content text="Download" />
                        <div className="border h-1/2"></div>
                    </div>
                    <div className="right-content w-2/5 flex items-center justify-around h-full">
                        <Content text="Sign up" />
                        <div className='flex items-center justify-center h-3/5 px-8 bg-white rounded-full font-semibold cursor-pointer'>
                            Log in
                        </div>

                    </div>

                </div>
            </div>
            <div className="songsDeck bg-songsdeck-black h-9/10 pt-4 p-8 overflow-auto">
                <Playlistview title={"Jump Back In"} cardData={CardData} />
                <Playlistview title={"Recently Played"} cardData={recentlyPlayed} />
                <Playlistview title={"Based on your recent listening"} cardData={recentListening} />

            </div>
        </div>
    </div>
}
const Playlistview = ({ title, cardData }) => {
    return <div className="text-white p-3">
        <div className="text-2xl font-bold mb-6">
            {title}
        </div>
        <div className=" w-full flex justify-between space-x-5 cursor-pointer">
            {
                cardData.map((item) => {
                    return (
                        <Card title={item.title} description={item.description} imgUrl={item.imgUrl} />
                    );
                })
            }

        </div>
    </div>
}
const Card = ({ title, description, imgUrl }) => {
    return <div className="w-1/5 bg-black bg-opacity-20 px-4 py-3 rounded-lg">
        <div className="px-2">
            <img className="w-full rounded-md pt-2" src={imgUrl} alt="label" />
        </div>
        <div className="text-white font-semibold pt-4 pb-1">
            {title}
        </div>
        <div className="text-gray-400 font-medium text-sm ">
            {description}
        </div>
    </div>
}
export default HomeComponent;