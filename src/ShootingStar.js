import React, { useState, useEffect } from 'react';
import { rand } from './Helpers';
import './ShootingStar.css';

const ShootingStar = () => {
  const [key, setKey] = useState(0);
  var starRetriggerDuration = 6000; // ms

  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prevKey => prevKey + 1);
    }, starRetriggerDuration);
    return () => clearInterval(interval);
  }, [starRetriggerDuration]);

  var startPos = rand(2,98);
  var direction = rand(0,1);
  starRetriggerDuration = rand(6000, 10000);

  return (
    <div>
      <div key={key} 
        className={`Shooting-Star ${direction < 0.5 ? "right-to-left" : "left-to-right"}`}
        style={{
          top:`${startPos}%`,
          '--starDirection': `${rand(-30, 30)}deg`,
        }}
      ></div>
    </div>
  );
};

export default ShootingStar;