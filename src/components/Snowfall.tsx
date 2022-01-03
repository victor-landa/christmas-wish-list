import { useEffect } from 'react';
import '../assets/styles/components/Snowfall.css';
import snowflakeImage from '../assets/static/snowflake.png';

export const Snowfall = () => {
  useEffect(() => {
    const snowFallInterval = setInterval(createSnowfall, 250);
    return () => clearInterval(snowFallInterval);
  }, [])

  const createSnowfall = () => {
    const snowflakeEl = document.createElement('img');
    const snowfallContainer = document.querySelector('.snowfall-container');
    snowflakeEl.src = snowflakeImage;
    snowflakeEl.classList.add('snowflake');
    snowflakeEl.style.left = Math.random() * window.innerWidth + 'px';
    snowflakeEl.style.animationDuration = Math.random() + 13 + 's';
    snowflakeEl.style.opacity = `${Math.random()}`;
    if(snowfallContainer) {
      snowfallContainer.appendChild(snowflakeEl);
    }
    setTimeout(() => {
      snowflakeEl.remove();
    }, 13000);
  }

  window.onbeforeprint = () => {
    const snowfallContainer = document.querySelector('.snowfall-container');
    if(snowfallContainer) {
      snowfallContainer.innerHTML = '';
    }
  };

  return (
    <>
      {createSnowfall()}
    </>
  )
}