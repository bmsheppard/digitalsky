import './Star.css';
import { rand } from './Helpers';

function Star({xPos, yPos}) {
  var interval = (rand(-0.5, 0.5) + 3).toString() + "s";
  return (
    <div className="Star-Wrapper" style={
      {
        left:`${xPos}px`, 
        top:`${yPos}px`, 
        animationDelay:`${rand(0,0.5)}s`,
        '--animation-name': rand(0,1) < 0.8 ? "smallShimmer" : "bigShimmer",
        '--animation-duration': interval,
        animation: 'var(--animation-name) ease-in-out var(--animation-duration) infinite'
      }
    } />
  );
}

export default Star;
