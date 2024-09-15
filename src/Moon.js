import React, { useState, useEffect, useRef } from 'react';
import './Moon.css';

function Moon() {
  const MOON_SIZE = 200;
  const SCROLL_SPEED_SCALE = 0.001;
  const MOON_HEIGHT_OFFSET = 200;
  const MOON_LOWEST_POINT = window.innerHeight - 400 + MOON_SIZE;
  const X_OFFSET = 0.15;
  const [scrollY, setScrollY] = useState(MOON_LOWEST_POINT);
  const [scrollX, setScrollX] = useState(window.innerWidth / 2);
  const [yDirection, setYDirection] = useState(1); // 1: falling -1: rising
  const [activePhase, setActivePhase] = useState(0);
  const PHASES = ["-50", "100", "50", "20", "0", "-20"];
  const moonPos = useRef();

  moonPos.current = scrollY;

  const handleScroll = (event) => {
    var amount = event.deltaY * (Math.max(moonPos.current - MOON_HEIGHT_OFFSET + 10, 1)) * SCROLL_SPEED_SCALE;
    const newVal = (amount) * yDirection;
    setScrollY(scrollY => scrollY + newVal);
    setScrollX(scrollX => (scrollX + event.deltaY*X_OFFSET));
    const CYCLE_COMPLETION_PERCENTAGE = (moonPos.current - MOON_SIZE) / (MOON_LOWEST_POINT - MOON_SIZE)*100;
    setScrollX(50 + CYCLE_COMPLETION_PERCENTAGE*yDirection); // offset calculations
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [yDirection]);

  if(scrollY < 0 + MOON_HEIGHT_OFFSET) {
    setScrollY(0 + MOON_HEIGHT_OFFSET);
    setYDirection(yDirection => yDirection*-1);
  }
  if(scrollY > MOON_LOWEST_POINT) {
    setScrollY(MOON_LOWEST_POINT);
    setYDirection(yDirection => yDirection*-1);
    setActivePhase(activePhase => (activePhase + 1*yDirection) % PHASES.length)
  }
  var percentage = (moonPos.current - MOON_SIZE) / (MOON_LOWEST_POINT - MOON_SIZE);
  document.documentElement.style.setProperty('--moon-position', `${percentage}`);

  console.log(scrollY);

  // extra "Moon" tage required because of this weird css webkit but with border radius and overflow
  return (
    <div className="Moon-Wrapper" 
      style={{
        top: `${scrollY}px`,
        left: `${scrollX}%`,
        width: `${MOON_SIZE}px`,
        height: `${MOON_SIZE}px`,
        '--moon-phase': `${PHASES[activePhase]}%`,
      }}>
        <div className="Moon" style={{ width: `${MOON_SIZE }px`, height: `${MOON_SIZE}px`,}} />
        <div className="Moon-Shadow" 
          style={{
            width: `${MOON_SIZE}px`,
            height: `${MOON_SIZE}px`,
            '--moon-phase': `${PHASES[activePhase]}%`,
            '--shadow-radius': PHASES[activePhase] === "0" ? "0%" : "50%",
        }}/>
      </div>
  );
}

export default Moon;
