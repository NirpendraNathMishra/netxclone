// Video.js
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Video() {
  const dispatch = useDispatch();
  const videos = useSelector(state => state.videos); 

  useEffect(() => {
    const fetchVideos = async () => {
      const url = `https://api.pexels.com/videos/search?query=nature&per_page=800`;
      const headers = {
        "Authorization": "xSotI7QowFGCQf5VqaZiSLxOdQUF66IU1p62PyVIhNwvd52r7S52iWWw"
      };
      const cachedVideos = localStorage.getItem('videos');

      if (cachedVideos) {
        // Use cached data
        dispatch({ type: 'SET_VIDEOS', payload: JSON.parse(cachedVideos) });
      } else {
      try {
        const response = await fetch(url, { headers });
        if (response.ok) {
          const data = await response.json();
          const portraitVideos = data.videos.filter(video => video.width < video.height);
          dispatch({ type: 'SET_VIDEOS', payload: portraitVideos });
        } else {
          console.log("HTTP-Error: " + response.status);
        }
      } catch (error) {
        console.error(error);
      }
        }
    };

    fetchVideos();

  }, [dispatch]);

  return (
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
        {videos.map((video, index) => (
            <div key={index} style={{
              margin: '10px',
              border: '5px solid white ',
              borderRadius: '10px',
              padding: '5px',
              width: '350px'
            }}>
              <Link to={{pathname: `/video/${video.id}`, state: {video: JSON.parse(JSON.stringify(video))}}}>
                <img src={video.image} alt={video.title}
                     style={{width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px'}}/>
                <h2>{video.title}</h2>
              </Link>
            </div>
        ))}
      </div>
  );
}

export default Video;
