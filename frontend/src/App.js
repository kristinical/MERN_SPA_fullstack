// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState } from 'react';

// Import components, styles, media
import Navigation from './components/Navigation';
import './App.css';

// Import Pages
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';

// Define the function that renders the content in routes using State.
function App() {

  const [exercise, setExercise] = useState([]);

  return (
    <>
      <Router>

          <header>
            <h1>Exercise Tracker</h1>
            <p>Manage your workouts!</p>
          </header>

          <Navigation />

          <main>
            <Route path="/" exact>
              <HomePage setExercise={setExercise} />
            </Route>

            <Route path="/add-exercise">
              <CreatePage />
            </Route>
            
            <Route path="/edit-exercise">
              <EditPage exercise={exercise} />
            </Route>
          </main>

          <footer>
            <p>&copy; 2022 Kristin Eberman</p>
          </footer>

      </Router>
    </>
  );
}

export default App;