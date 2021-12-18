import { useState } from 'react';
import '../assets/styles/components/List.css';

export const List = () => {
  const [list, setList] = useState(['iPhone 13 Pro Max', 'iPad Air', 'Teclado mecánico']);

  const handleForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const input = document.querySelector<HTMLInputElement>('input[name="gift"]');
    if(input) {
      if(input.value.trim() !== '') {
        setList([...list, input.value]);
        input.value = '';
      }
    }
  }

  return (
    <div className='wish-list-card'>
      <h1 className='wish-list-card__title'>Gifts</h1>
      <ul className='wish-list-card__items'>
        {list.map((item, index) =>
          <li key={index}>- {item}</li>
        )}
      </ul>
      <form className='form' onSubmit={handleForm} autoComplete="off">
        <input className='form__input' type="text" name="gift" placeholder='New gift' required />
        <button className='form__submit' type="submit">Add</button>
      </form>
    </div>
  )
}