import './App.css';
import Home from './components/Home';
import NavBar from './components/NavBar';
import myImage from './imges/Barbie.jpg';
import FavList from './components/FavList'
import { Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';


function App() {
  return (
    <div className="App">
      <NavBar />
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/FavList" element={<FavList />} />
      </Routes>
      
      {/* <Home /> */}
    </div>
  );
}

export default App;


