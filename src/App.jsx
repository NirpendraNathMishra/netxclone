import Video from './components/video.jsx';
import VideoPlayer from './components/videoplayer.jsx';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./components/store"; // Import the store

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Video />} />
                    <Route path="/video/:id" element={<VideoPlayer />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
