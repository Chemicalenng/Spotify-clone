
import { useRef, useEffect, useState } from 'react';
const AudioProgressBar = ({ tracksrc, isPaused }) => {
    const audioref = useRef();
    const progressref = useRef();
    const [duration, setDuration] = useState(0);
    const [currentTime, setTime] = useState(0);//current playback time


    useEffect(() => {
        const currentAudio = audioref.current;
        const setAudio = () => {
            setDuration(currentAudio.duration);
            console.log(currentAudio.duration);
        };
        //updates curent time state as audio plays
        const setAudioTime = () => {
            if (currentAudio.currentTime) {
                console.log(currentAudio.currentTime);
                setTime(currentAudio.currentTime);
            }

        };
        //update the state when data is loaded and time updates
        currentAudio.addEventListener('loadeddata', setAudio);
        currentAudio.addEventListener('timeupdate', setAudioTime);
        //remove event listeners when song finishes
        return () => {
            currentAudio.removeEventListener('loadeddata', setAudio);
            currentAudio.removeEventListener('timeupdate', setAudioTime);
        }
    }, [tracksrc]);

    const progressClick = (e) => {
        //gets the horizontal position (in pixels) of the click event relative to the progress bar element.
        //progress.offsetWidth is the total width (in pixels) of the progress bar element.
        //(e.nativeEvent.offsetX / progress.offsetWidth) calculates the click position as a fraction of 
        //the total width of the progress bar. This value ranges from 0 to 1.
        const progress = progressref.current;
        const newTime = (e.nativeEvent.offsetX / progress.offsetWidth) * duration;
        audioref.current.currentTime = newTime;
    }
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    }
    useEffect(() => {
        const currentAudio = audioref.current;
        if (isPaused) {
            currentAudio.pause();
        } else {
            currentAudio.play();
        }
    }, [isPaused]);

    return (
        <div className='audioPlayer w-full justify-center items-center'>

            <audio ref={audioref} src={tracksrc} />

            <div className='progress_container mx-2 cursor-default flex' ref={progressref} onClick={progressClick}>
                <div className='text-gray-300 pr-2 text-xs font-medium font-Poppins'>{formatTime(currentTime)}</div>
                <div className='progress_bar bg-songsdeck-black h-1 relative flex-grow rounded-full mt-2 '>
                    <div className='progress_indicator bg-button-green h-1 absolute top-0'
                        style={{ width: `${(currentTime / duration) * 100}%` }}>

                    </div>
                </div>
                <div className="time_display text-gray-300 cursor-default pl-2 text-xs font-medium font-Poppins">
                    {formatTime(duration)}
                </div>
            </div>

        </div>
    );


};
export default AudioProgressBar;