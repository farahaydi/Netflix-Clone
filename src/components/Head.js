import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import myImage from '../imges/Barbie.jpg';
function Head()
{
    return(
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
    );
}

export default Head ;

