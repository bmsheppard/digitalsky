import React, { useState, useEffect, useRef } from 'react';
import './Night.css';

function Moon({triggerDay, yDirection , setYDirection}) {
  const MOON_SIZE = 200;
  const SCROLL_SPEED_SCALE = 0.001;
  const MOON_HEIGHT_OFFSET = 200;
  const MOON_LOWEST_POINT = window.innerHeight - 400 + MOON_SIZE;
  const [scrollY, setScrollY] = useState(MOON_LOWEST_POINT - 1);
  const [scrollX, setScrollX] = useState(window.innerWidth / 2);
  const [safeY, setSafeY] = useState(yDirection);
  const [activePhase, setActivePhase] = useState(0);
  const [safeUpdate, setSafeUpdate] = useState();
  const PHASES = ["-50", "100", "50", "20", "0", "-20"];
  const moonPos = useRef();

  moonPos.current = scrollY;

  useEffect(() => {
    if (safeUpdate) {
      triggerDay()
    }
  }, [safeUpdate])

  useEffect(() => {
    if (safeY) {
      setYDirection(safeY);
    }
  }, [safeY])

  const handleScroll = (event) => {
    var amount = event.deltaY * (Math.max(moonPos.current - MOON_HEIGHT_OFFSET + 10, 1)) * SCROLL_SPEED_SCALE;
    const newVal = (amount) * yDirection;
    setScrollY(scrollY => scrollY + newVal);
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
    setSafeY(yDirection => yDirection*-1);
  }
  if(scrollY > MOON_LOWEST_POINT) {
    setScrollY(MOON_LOWEST_POINT);
    setSafeY(yDirection => yDirection*-1);
    setActivePhase(activePhase => (activePhase + 1*yDirection) % PHASES.length);
    setSafeUpdate(true);
  }
  var percentage = (moonPos.current - MOON_SIZE) / (MOON_LOWEST_POINT - MOON_SIZE);
  document.documentElement.style.setProperty('--sky-color', `rgba(135, 206, 235, ${percentage})`);
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
