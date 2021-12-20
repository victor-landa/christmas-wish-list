import { useState } from 'react';
import '../assets/styles/components/List.css';

interface WishListItem {
  title: string;
  quantity: number;
}

export const List = () => {
  const localStorageList = localStorage.getItem('wish-list');
  const [list, setList] = useState<Array<WishListItem>>(localStorageList ? JSON.parse(localStorageList) : []);

  const handleForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const inputTitle = document.querySelector<HTMLInputElement>('input[name="gift"]');
    const inputQuantity = document.querySelector<HTMLInputElement>('input[name="quantity"]');
    if(inputTitle && inputQuantity) {
      if(inputTitle.value.trim() !== '') {
        let repeatedItem = false;
        list.map(item=> {
          if(item.title === inputTitle.value) {
            repeatedItem = true;
          }
        })
        if(!repeatedItem) {
          setList([...list, {title: inputTitle.value.trim(), quantity: Number(inputQuantity.value)}]);
          localStorage.setItem('wish-list', JSON.stringify([...list, {title: inputTitle.value.trim(), quantity: Number(inputQuantity.value)}]));
        }
        inputTitle.value = '';
        inputQuantity.value = '';
        inputTitle.focus();
      }
    }
  }

  const handleDeleteItem = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLSpanElement;
    const title = target.dataset.itemTitle;
    setList(list.filter(item => item.title !== title));
    localStorage.setItem('wish-list', JSON.stringify(list.filter(item => item.title !== title)));
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
            <li className="wish-list-card__item" key={index}>- {item.title} ({item.quantity}) <span className="wish-list-card__item-delete" data-item-title={item.title} onClick={handleDeleteItem}>x</span></li>
          )}
        </ul>
      : <p className="wish-list-card__empty">Add your first gift. Don't be a Grinch!</p>}
      <form className="form" onSubmit={handleForm} autoComplete="off">
        <input className="form__input" type="text" name="gift" placeholder="New gift" required />
        <input className="form__input form__input--quantity" type="number" min="1" name="quantity" placeholder="Quantity" required />
        <button className="form__button" type="submit">Add</button>
        <button className="form__button form__button--clear" type="button" onClick={handleClearList}>Clear</button>
      </form>
    </div>
  )
}