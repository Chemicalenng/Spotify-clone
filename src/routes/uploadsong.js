import spotifyLogo from "../images/spotify_logo_white.svg"
import Text from "../components/shared/text"
import { Icon } from '@iconify/react';
import Content from "../components/shared/content";
import TextInput from "../components/shared/input";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import { useState } from "react";
import { authenticatedPostRequest } from "../utils/helpers";
import { useNavigate } from "react-router-dom";



const UpLoadSong = () => {
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [playlistUrl, setPlaylistUrl] = useState("");
    const [uploadedSongFileName, setUploadedSongFileName] = useState("");
    const navigate = useNavigate();

    const submitTrack = async () => {
        const Data = { name, thumbnail, track: playlistUrl }
        const response = await authenticatedPostRequest("/Song/create", Data);
        console.log(response);
        if (response.err) {
            alert('Error uploading song');
            return;
        }
        alert("Success");
        navigate("/loggedHome");
    }

    const clickOnHome = () => {
        navigate("/loggedHome");

    }
    const clickOnMymusic = () => {
        navigate("/myMusic");
    }

    return <div className=" h-full w-full flex">
        <div className="sidebar-container h-full w-1/6 bg-black cursor-pointer flex flex-col justify-between">
            <div>
                <div className="sidebar logo p-6">
                    <img src={spotifyLogo} alt="Spotify Logo" width={125}></img>
                </div>
                <div className="sidebar_contents py-3">
                    <Text iconName={"material-symbols:home"} text={"Home"} active onClick={clickOnHome} />
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
            <div className="navbar w-full h-1/10 bg-navbar-black bg-opacity-95 flex items-center justify-end">
                <div className="w-1/2 flex h-full">
                    <div className="left-content w-2/3 flex items-center justify-around">
                        <Content text="Premium" />
                        <Content text="Support" />
                        <Content text="Download" />
                        <div className="border h-1/2"></div>
                    </div>
                    <div className="right-content w-1/3 flex items-center justify-around h-full">
                        <Content text="Upload Song" />
                        <div className='flex items-center justify-center w-11 h-11 bg-white rounded-full font-semibold cursor-pointer'>
                            User
                        </div>

                    </div>
                </div>
            </div>
            <div className="songsDeck bg-songsdeck-black h-9/10 pt-4 p-8 overflow-auto">
                <div className="text-2xl font-bold mb-6 text-white p-3">
                    Upload Your Music
                </div>
                <div className="w-2/3 flex space-x-4 text-white">
                    <div className="w-1/2 flex ">
                        <TextInput label="Name" placeholder="Name of Track" value={name} setValue={setName} />
                    </div>
                    <div className="w-1/2 flex">
                        <TextInput label="Thumbnail" placeholder="Thumbnail" value={thumbnail} setValue={setThumbnail} />
                    </div>

                </div>
                <div className="flex space-x-3 pt-3">
                    {uploadedSongFileName ? (
                        <div className="bg-white rounded-md py-2 px-6 w-1/6">
                            {uploadedSongFileName.substring(0, 18)}....
                        </div>
                    ) : (
                        <CloudinaryUpload setUrl={setPlaylistUrl} setName={setUploadedSongFileName} />

                    )
                    }
                    <div className="bg-white font-bold w-20 rounded-full cursor-pointer flex items-center justify-center " onClick={submitTrack}>
                        Upload
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default UpLoadSong;