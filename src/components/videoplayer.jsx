import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./videoplayer.css"; // Import the CSS file

function VideoPlayer() {
    const location = useLocation();
    const navigate = useNavigate();
    let videos = useSelector(state => state.videos);
    const videoId = location.pathname.split('/').pop();
    const [videoIndex, setVideoIndex] = useState(videos.findIndex(video => video.id.toString() === videoId));
    const [currentVideo, setCurrentVideo] = useState(videos[videoIndex]);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    useEffect(() => {
        if (!currentVideo) {
            navigate('/');
        }
    }, [currentVideo, navigate]);

    useEffect(() => {
        const handleKeyPress = () => {
            let newIndex = Math.floor(Math.random() * videos.length);
            setCurrentVideo({...videos[newIndex]});
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [videos]);

    useEffect(() => {
        const handleScroll = () => {
            const st = window.pageYOffset || document.documentElement.scrollTop;
            if (st !== lastScrollTop){
                let newIndex = Math.floor(Math.random() * videos.length);
                setCurrentVideo(videos[newIndex]);
            }
            setLastScrollTop(st <= 0 ? 0 : st);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop, videos]);
    
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
                playsInline={true}
                onClick={(e) => e.target.paused ? e.target.play() : e.target.pause()}
            >
                <source src={currentVideo.video_files[3].link} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default VideoPlayer;
