import SongCard from "../components/shared/songCard";
import { authenticatedGetRequest } from "../utils/helpers";
import { useEffect, useState } from "react";
import { useAudioContext } from "../contexts/audiocontext";
import LoggedHomeContainer from "../containers/loggedHomecontainer";

const MyMusic = () => {
    const [songData, setSongData] = useState([]);
    const { playTrack } = useAudioContext();

    useEffect(() => {
        //fetch data, array makes it to render only one time
        const getData = async () => {
            const response = await authenticatedGetRequest("/Song/get/mysongs");
            setSongData(response.data);
        }
        getData();
    }, [])
    return (<LoggedHomeContainer>
        <div className="text-white font-bold pb-5 text-3xl pt-6">
            My Songs
        </div>
        <div className="space-y-3 overflow-auto">
            {songData.map((item) => {
                return <SongCard info={item} playTrack={playTrack} />
            })}

        </div>

    </LoggedHomeContainer>)
}

export default MyMusic;