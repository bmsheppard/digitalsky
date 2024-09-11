import './Star.css';

function Star({xPos, yPos}) {
  // console.log(xPos, yPos)
  return (
    <div className="Star-Wrapper" style={
      {left:`${xPos}px`, top:`${yPos}px`, animationDelay:`${Math.random()*2}s`}
    } />
  );
}

export default Star;
