import { useState } from 'react';

export const List = () => {
  const [list, setList] = useState(['iPhone 13 Pro Max', 'Silla', 'Teclado mecánico']);

  return (
    <div>
      <h1>Regalos</h1>
      <ul>
        {list.map(item =>
          <li>{item}</li>
        )}
      </ul>
    </div>
  )
}