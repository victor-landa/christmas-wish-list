import { useEffect } from 'react';
import '../assets/styles/components/Snowfall.css';
import snowflakeImage from '../assets/static/snowflake.png';

export const Snowfall = () => {
  useEffect(() => {
    const snowFallInterval = setInterval(createSnowfall, 250);
    return () => clearInterval(snowFallInterval);
  }, [])

  const createSnowfall = () => {
    const snowFlakeEl = document.createElement('img');
    snowFlakeEl.src = snowflakeImage;
    snowFlakeEl.classList.add('snowflake');
    snowFlakeEl.style.left = Math.random() * window.innerWidth + 'px';
    snowFlakeEl.style.animationDuration = Math.random() + 8 + 's';
    snowFlakeEl.style.opacity = `${Math.random()}`;
    document.body.appendChild(snowFlakeEl);
    setTimeout(() => {
      snowFlakeEl.remove();
    }, 8000);
  }

  return (
    <>
      {createSnowfall()}
    </>
  )
}