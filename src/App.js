import { useState } from 'react';
import Star from './Star';
import ShootingStar from './ShootingStar';
import Night from './Night';
import Day from './Day';
import { rand } from './Helpers';
import './App.css';

function App() {
  const NUM_STARS = 100;
  const [day, setDay] = useState(true);
  const [stars, setStars] = useState([]);
  const [yDirection, setYDirection] = useState(-1); // 1: falling -1: rising

  if (stars.length < NUM_STARS) {
    let tmp = []
    for (let i = 0; i < NUM_STARS; ++i) {
      var xPos = rand(0, window.innerWidth)
      var yPos = rand(0, window.innerHeight)
      tmp.push(
        <Star key={`star-${xPos}-${yPos}`}
              xPos={xPos} 
              yPos={yPos}
        />
      )
    }
    setStars(tmp);
  }
  return (
    <div className="App-Wrapper">
      <div className="sky">
      {
        !day && stars
      }
      {
        day ? 
          <Day triggerDay={() => setDay(false)} yDirection={yDirection} setYDirection={setYDirection} /> :
          <Night triggerDay={() => setDay(true)} yDirection={yDirection} setYDirection={setYDirection} />
      }
      {
        !day && <ShootingStar />
      }
      </div>
    </div>
  );
}

export default App;
