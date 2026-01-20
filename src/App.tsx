import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { MoviePage } from './components/MoviePage';
import { MovieProvider } from './state';

function App() {
  return (
    <BrowserRouter basename="/etraveli-movie-app">
      <Routes>
        <Route
          path="/"
          element={
            <MovieProvider>
              <MoviePage />
            </MovieProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
