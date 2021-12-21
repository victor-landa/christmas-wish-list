import { useState } from 'react';
import { Modal } from './Modal';
import { Overlay } from './Overlay';
import '../assets/styles/components/List.css';

interface WishListItem {
  title: string;
  recipient: string;
  quantity: number;
  source: string;
}

export const List = () => {
  const localStorageList = localStorage.getItem('wish-list');
  const [list, setList] = useState<Array<WishListItem>>(localStorageList ? JSON.parse(localStorageList) : []);
  const [modalState, setModalState] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const handleForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const inputTitle = document.querySelector<HTMLInputElement>('input[name="gift"]');
    const inputRecipient = document.querySelector<HTMLInputElement>('input[name="recipient"]');
    const inputQuantity = document.querySelector<HTMLInputElement>('input[name="quantity"]');
    const inputSource = document.querySelector<HTMLInputElement>('input[name="source"]');
    if(inputTitle && inputRecipient && inputQuantity && inputSource) {
      if(inputTitle.value.trim() !== '' && inputRecipient.value.trim() !== '' && inputSource.value.trim() !== '') {
        let repeatedItem = false;
        list.map(item=> {
          if(item.title === inputTitle.value) {
            repeatedItem = true;
          }
        })
        if(!repeatedItem) {
          setList([
            ...list,
            {
              title: inputTitle.value.trim(),
              recipient: inputRecipient.value.trim(),
              quantity: Number(inputQuantity.value),
              source: inputSource.value.trim(),
            }]);
          localStorage.setItem('wish-list', JSON.stringify([
            ...list,
            {
              title: inputTitle.value.trim(),
              recipient: inputRecipient.value.trim(),
              quantity: Number(inputQuantity.value),
              source: inputSource.value.trim()
            }
          ]));
          handleToggleModal();
        }
        inputTitle.value = '';
        inputRecipient.value = '';
        inputQuantity.value = '';
        inputSource.value = '';
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
    localStorage.setItem('wish-list', JSON.stringify([]));
  }

  const form = () => {
    return (
      <form className="form" onSubmit={handleForm} autoComplete="off">
        <input className="form__input" type="text" name="gift" placeholder="New gift" required />
        <input className="form__input form__input--below" type="text" name="recipient" placeholder="This gift is to..." required />
        <input className="form__input form__input--below" type="number" min="1" name="quantity" placeholder="Quantity" required />
        <input className="form__input form__input--below" type="url" name="source" placeholder="Image link" pattern="https://.*" required />
        <button className="form__button" type="submit">Add</button>
        <button className="form__button form__button--close" type="button" onClick={handleToggleModal}>Close</button>
      </form>
    )
  }

  const handleToggleModal = () => {
    setOverlay(!overlay);
    setModalState(!modalState);
  }

  return (
    <>
      <div className="wish-list-card">
        <h1 className="wish-list-card__title">Gifts</h1>
        {list.length > 0 ?
          <ul className="wish-list-card__items">
            {list.map((item, index) =>
              <li className="wish-list-card__item" key={index}>
                <div className="wish-list-card__item-info">
                  <img className="wish-list-card__item-image" src={item.source} />
                  <div className="wish-list-card__item-text">
                    <span>{item.title} ({item.quantity})</span>
                    <span className="wish-list-card__item-recipient">{item.recipient}</span>
                  </div>
                </div>
                <span
                  className="wish-list-card__item-delete"
                  data-item-title={item.title}
                  onClick={handleDeleteItem}>
                  x
                </span>
              </li>
            )}
          </ul>
        : <p className="wish-list-card__empty">Add your first gift. Don't be a Grinch!</p>}
        <button className="form__button form__button--add" onClick={handleToggleModal}>Add gift</button>
        <button className="form__button form__button--clear" type="button" onClick={handleClearList}>Clear</button>
      </div>
      <Modal form={form()} modalState={modalState} />
      <Overlay overlayState={overlay} />
    </>
  )
}