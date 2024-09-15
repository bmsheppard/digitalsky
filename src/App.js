import Star from './Star';
import ShootingStar from './ShootingStar';
import Moon from './Moon';
import { rand } from './Helpers';
import './App.css';

function App() {
  const NUM_STARS = 100;
  const stars = [];

  for (let i = 0; i < NUM_STARS; ++i) {
    var xPos = rand(0, window.innerWidth)
    var yPos = rand(0, window.innerHeight)
    stars.push(
      <Star key={`star-${xPos}-${yPos}`}
            xPos={xPos} 
            yPos={yPos}
      />
    )
  }
  return (
    <div className="App-Wrapper">
      <div className="sky">
      {
        stars
      }
      <Moon />
      <ShootingStar />
      </div>
    </div>
  );
}

export default App;
