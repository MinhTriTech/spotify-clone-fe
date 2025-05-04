import { useEffect } from "react";

const VideoPlayerModal = ({ videoUrl, onClose }) => {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="relative w-[90%] max-w-3xl">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white text-xl bg-red-600 px-3 py-1 rounded z-50"
                >
                    ✕
                </button>
                <video controls autoPlay className="w-full h-auto rounded shadow-lg">
                    <source src={videoUrl} type="video/mp4" />
                    Trình duyệt của bạn không hỗ trợ video.
                </video>
            </div>
        </div>
    );
};

export default VideoPlayerModal;
