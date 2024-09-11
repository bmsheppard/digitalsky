import Star from './Star';
import './App.css';

function App() {
  const NUM_STARS = 100;
  const stars = [];
  const randomX = () => {
    let xMax = window.innerWidth;
    return Math.random() * xMax;
  }
  const randomY = () => {
    let yMax = window.innerHeight;
    return Math.random() * yMax;
  }

  for (let i = 0; i < NUM_STARS; ++i) {
    stars.push(<Star xPos={randomX()} yPos={randomY()}/>)
  }
  return (
    <div className="App-Wrapper">{stars}</div>
  );
}

export default App;
