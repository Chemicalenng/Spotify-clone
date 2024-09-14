import { useContext, createContext } from "react";
import { Howl, Howler } from "howler";
import { useState } from "react";

const AudioContext = createContext();
export const AudioProvider = ({ children }) => {
    const [playedTrack, setPlayedTrack] = useState(null);

    const playTrack = (tracksrc) => {
        if (playedTrack) {
            playedTrack.stop()
        }
        let sound = new Howl({
            src: [tracksrc],
            html5: true
        });
        setPlayedTrack(sound);
        sound.play();

    }
    return (
        <AudioContext.Provider value={{ playTrack}}>
            {children}
        </AudioContext.Provider>
    );
}
export const useAudioContext = () => useContext(AudioContext);