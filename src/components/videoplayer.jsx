import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./videoplayer.css"; // Import the CSS file

function VideoPlayer() {
    const location = useLocation();
    const navigate = useNavigate();
    const videos = useSelector(state => state.videos);
    const videoId = location.pathname.split('/').pop();
    const videoIndex = videos.findIndex(video => video.id.toString() === videoId);
    const [currentVideo, setCurrentVideo] = useState(videos[videoIndex]);

    useEffect(() => {
        if (!currentVideo) {
            navigate('/');
        }
    }, [currentVideo, navigate]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            const videoIndex = videos.findIndex(video => video.id.toString() === currentVideo.id.toString());
            let newIndex;
            let animationName;
            if (event.key === 'ArrowUp') {
                newIndex = videoIndex - 1 >= 0 ? videoIndex - 1 : videos.length - 1;
                animationName = 'slide-down';
            } else if (event.key === 'ArrowDown') {
                newIndex = videoIndex + 1 < videos.length ? videoIndex + 1 : 0;
                animationName = 'slide-up';
            }
            if (newIndex !== undefined) {
                setCurrentVideo({...videos[newIndex], animation: animationName});
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentVideo, videos]);

    if (!currentVideo) {
        return null;
    }

    return (
        <div className="video-container">
            <video
                key={currentVideo.id}
                className={`video-player ${currentVideo.animation}`}
                autoPlay={true}
                loop={true}
                muted={false}
                onClick={(e) => e.target.paused ? e.target.play() : e.target.pause()}
            >
                <source src={currentVideo.video_files[0].link} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default VideoPlayer;
