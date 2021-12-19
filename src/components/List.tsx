import { useState } from 'react';
import '../assets/styles/components/List.css';

export const List = () => {
  const [list, setList] = useState(['iPhone 13 Pro Max', 'iPad Air', 'Teclado mecánico']);

  const handleForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const input = document.querySelector<HTMLInputElement>('input[name="gift"]');
    if(input) {
      if(input.value.trim() !== '') {
        if(!list.includes(input.value)) {
          setList([...list, input.value.trim()]);
        }
        input.value = '';
      }
    }
  }

  const handleDeleteItem = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLSpanElement;
    const name = target.dataset.itemName;
    setList(list.filter(item => item !== name));
  }

  const handleClearList = () => {
    setList([]);
  }

  return (
    <div className="wish-list-card">
      <h1 className="wish-list-card__title">Gifts</h1>
      {list.length > 0 ?
        <ul className="wish-list-card__items">
          {list.map((item, index) =>
            <li className="wish-list-card__item" key={index}>- {item} <span className="wish-list-card__item-delete" data-item-name={item} onClick={handleDeleteItem}>x</span></li>
          )}
        </ul>
      : <p className="wish-list-card__empty">Add your first gift. Don't be a Grinch!</p>}
      <form className="form" onSubmit={handleForm} autoComplete="off">
        <input className="form__input" type="text" name="gift" placeholder="New gift" required />
        <button className="form__button" type="submit">Add</button>
        <button className="form__button form__button--clear" type="button" onClick={handleClearList}>Clear</button>
      </form>
    </div>
  )
}