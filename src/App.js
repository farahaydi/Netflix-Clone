import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import myImage from './imges/Barbie.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="img-container">
        <img src={myImage} alt="My Image" className="img" />

        <div className="overlay">
          <div className="button-container">
            <a href="https://www.youtube.com/watch?v=pBk4NYhWNMM&ab_channel=WarnerBros.Pictures" target="_blank" rel="noopener noreferrer">
              <button className="play-button">
              <FontAwesomeIcon icon={faPlay} className="play-icon" />
              </button>
            </a>
            <p className="play-text">Play Trailer</p>
          </div>
        </div>
      </div>
      <Home />
    </div>
  );
}

export default App;


