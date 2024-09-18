import React, { useState, useEffect, useRef } from 'react';
import './Day.css';

function Day({triggerDay, yDirection , setYDirection}) {
  const SUN_SIZE = 200;
  const RAY_SIZE = 50;
  const SCROLL_SPEED_SCALE = 0.001;
  const SUN_HEIGHT_OFFSET = 200;
  const SUN_LOWEST_POINT = window.innerHeight - 400 + SUN_SIZE;
  const [scrollY, setScrollY] = useState(SUN_LOWEST_POINT - 1);
  const [scrollX, setScrollX] = useState(window.innerWidth / 2);
  const [safeY, setSafeY] = useState(yDirection);
  const [safeUpdate, setSafeUpdate] = useState();
  const sunPos = useRef();

  sunPos.current = scrollY;

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
    var amount = event.deltaY * (Math.max(sunPos.current - SUN_HEIGHT_OFFSET + 10, 1)) * SCROLL_SPEED_SCALE;
    const newVal = (amount) * yDirection;
    setScrollY(scrollY => scrollY + newVal);
    const CYCLE_COMPLETION_PERCENTAGE = (sunPos.current - SUN_SIZE) / (SUN_LOWEST_POINT - SUN_SIZE)*100;
    setScrollX(50 + CYCLE_COMPLETION_PERCENTAGE*yDirection); // offset calculations
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [yDirection]);

  if(scrollY < 0 + SUN_HEIGHT_OFFSET) {
    setScrollY(0 + SUN_HEIGHT_OFFSET);
    setSafeY(yDirection => yDirection*-1);
  }
  if(scrollY > SUN_LOWEST_POINT) {
    setScrollY(SUN_LOWEST_POINT);
    setSafeY(yDirection => yDirection*-1);
    setSafeUpdate(true);
  }
  var percentage = (sunPos.current - SUN_SIZE) / (SUN_LOWEST_POINT - SUN_SIZE);
  document.documentElement.style.setProperty('--sky-color', `rgba(135, 206, 235)`);
  return (
    <div className="Sun-Wrapper" 
      style={{
        top: `${scrollY}px`,
        left: `${scrollX}%`,
        width: `${SUN_SIZE}px`,
        height: `${SUN_SIZE}px`,
      }}>
        <div className="Sun-Glow" style={{ width: `${SUN_SIZE + RAY_SIZE*3}px`, height: `${SUN_SIZE + RAY_SIZE*3}px`, left: `${-RAY_SIZE*3/2}px`, top: `${-RAY_SIZE*3/2}px`, opacity: 0.1}} />
        <div className="Sun-Glow" style={{ width: `${SUN_SIZE + RAY_SIZE}px`, height: `${SUN_SIZE + RAY_SIZE}px`, left: `${-RAY_SIZE/2}px`, top: `${-RAY_SIZE/2}px`}} />
        <div className="Sun" style={{ width: `${SUN_SIZE}px`, height: `${SUN_SIZE}px`}} />
      </div>
  );
}

export default Day;
