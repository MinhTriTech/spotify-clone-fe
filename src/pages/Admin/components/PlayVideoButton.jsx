import { useState } from "react";
import VideoPlayerModal from "./VideoPlayerModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const PlayVideoButton = ({ videoUrl }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="bg-green-500 text-white px-2 py-1 rounded-full hover:bg-green-600 transition"
                title="Xem video bài hát"
            >
                <FontAwesomeIcon icon={faPlay} />
            </button>
            {open && <VideoPlayerModal videoUrl={videoUrl} onClose={() => setOpen(false)} />}
        </>
    );
};

export default PlayVideoButton;
