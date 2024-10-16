import { Navigate, Route, Routes } from 'react-router-dom';

import EpisodePage from './pages/EpisodePage';
import HomePage from './pages/HomePage';
import PodcastPage from './pages/PodcastPage';
import Layout from './components/Layout';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/podcast/:podcastId" element={<PodcastPage />} />
          <Route
            path="/podcast/:podcasId/episode/:episodeId"
            element={<EpisodePage />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
