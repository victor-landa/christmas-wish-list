import { useState } from 'react';
import '../assets/styles/components/List.css';

export const List = () => {
  const [list, setList] = useState(['🎁 iPhone 13 Pro Max', '🎁 iPad Air', '🎁 Teclado mecánico']);

  return (
    <div className='wish-list-card'>
      <h1 className='wish-list-card__title'>Gifts</h1>
      <ul className='wish-list-card__items'>
        {list.map(item =>
          <li>{item}</li>
        )}
      </ul>
    </div>
  )
}