import Star from './Star';
import ShootingStar from './ShootingStar';
import { rand } from './Helpers';
import './App.css';

function App() {
  const NUM_STARS = 100;
  const stars = [];

  for (let i = 0; i < NUM_STARS; ++i) {
    stars.push(
      <Star xPos={rand(0, window.innerWidth)} 
            yPos={rand(0, window.innerHeight)}
      />
    )
  }
  return (
    <div className="App-Wrapper">
      <>
      <ShootingStar />
      {
        stars
      }
      </>
    </div>
  );
}

export default App;
