import { useState, useEffect, ChangeEvent } from 'react';
import { Modal } from './Modal';
import { Overlay } from './Overlay';
import { randomGift } from '../utils/randomGift';
import '../assets/styles/components/List.css';

interface WishListItem {
  title: string;
  price: string;
  recipient: string;
  quantity: number;
  source: string;
}

export const List = () => {
  const [list, setList] = useState<Array<WishListItem>>([]);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [formValues, setFormValues] = useState<WishListItem>({
    title: '',
    price: '',
    recipient: '',
    quantity: 1,
    source: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editedItem, setEditedItem] = useState<Number>();

  const listPromise = new Promise(resolve => {
    setTimeout(() => {
      const localStorageList = localStorage.getItem('wish-list');
      if(localStorageList) {
        resolve(localStorageList);
      } else {
        resolve([]);
      }
    }, 250);
  });

  useEffect(() => {
    listPromise
      .then(response => {
        setList(typeof response === 'string' ? JSON.parse(response) : [] );
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const inputTitle = document.querySelector<HTMLInputElement>('input[name="title"]');
    const inputPrice = document.querySelector<HTMLInputElement>('input[name="price"]');
    const inputRecipient = document.querySelector<HTMLInputElement>('input[name="recipient"]');
    const inputQuantity = document.querySelector<HTMLInputElement>('input[name="quantity"]');
    const inputSource = document.querySelector<HTMLInputElement>('input[name="source"]');
    if(inputTitle && inputPrice && inputRecipient && inputQuantity && inputSource) {
      if(inputTitle.value.trim() !== '' && inputPrice.value.trim() !== '' && inputRecipient.value.trim() !== '' && inputSource.value.trim() !== '') {
        let repeatedItem = false;
        list.map(item => {
          if(
            item.title === inputTitle.value &&
            item.price === inputPrice.value &&
            item.recipient === inputRecipient.value &&
            item.quantity === Number(inputQuantity.value) &&
            item.source === inputSource.value
          ) {
            repeatedItem = true;
          }
        })
        if(editMode) {
          if(typeof editedItem === 'number') {
            list[editedItem].title = inputTitle.value.trim();
            list[editedItem].price = inputPrice.value.trim();
            list[editedItem].recipient = inputRecipient.value.trim();
            list[editedItem].quantity =Number(inputQuantity.value);
            list[editedItem].source = inputSource.value.trim();
            localStorage.setItem('wish-list', JSON.stringify([...list]));
            handleToggleModal();
          }
        } else {
          if(!repeatedItem) {
            setList([
              ...list,
              {
                title: inputTitle.value.trim(),
                price: inputPrice.value.trim(),
                recipient: inputRecipient.value.trim(),
                quantity: Number(inputQuantity.value),
                source: inputSource.value.trim(),
              }]);
            localStorage.setItem('wish-list', JSON.stringify([
              ...list,
              {
                title: inputTitle.value.trim(),
                price: inputPrice.value.trim(),
                recipient: inputRecipient.value.trim(),
                quantity: Number(inputQuantity.value),
                source: inputSource.value.trim()
              }
            ]));
            handleToggleModal();
          }
        }
        setFormValues({
          title: '',
          price: '',
          recipient: '',
          quantity: 1,
          source: ''
        });
        inputTitle.value = '';
        inputPrice.value = '';
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
    const selectedItem = list.find(item => item.title === title);
    const selectedItemIndex = list.findIndex(item => item === selectedItem);
    setList(list.filter((_, index) => index !== selectedItemIndex));
    localStorage.setItem('wish-list', JSON.stringify(list.filter((_, index) => index !== selectedItemIndex)));
  }

  const handleEditItem = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLSpanElement;
    const title = target.dataset.itemTitle;
    const selectedItem = list.find(item => item.title === title);
    const selectedItemIndex = list.findIndex(item => item === selectedItem);
    setEditMode(true);
    setEditedItem(selectedItemIndex);
    if(selectedItem) {
      setFormValues({
        title: selectedItem.title,
        price: selectedItem.price,
        recipient: selectedItem.recipient,
        quantity: selectedItem.quantity,
        source: selectedItem.source
      });
      handleToggleModal();
    }
  }

  const handleDuplicateItem = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLSpanElement;
    const title = target.dataset.itemTitle;
    const selectedItem = list.find(item => item.title === title);
    const selectedItemIndex = list.findIndex(item => item === selectedItem);
    setEditedItem(selectedItemIndex);
    if(selectedItem) {
      setFormValues({
        title: selectedItem.title,
        price: selectedItem.price,
        recipient: selectedItem.recipient,
        quantity: selectedItem.quantity,
        source: selectedItem.source
      });
      handleToggleModal();
    }
  }

  const handleClearList = () => {
    setList([]);
    localStorage.setItem('wish-list', JSON.stringify([]));
  }

  const handleInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  const getRandomGiftTitle = () => {
    const giftTitle = randomGift();
    setFormValues({
      title: giftTitle,
      price: formValues.title,
      recipient: formValues.recipient,
      quantity: formValues.quantity,
      source: formValues.source
    });
  }

  const form = () => {
    return (
      <form className="form" onSubmit={handleForm} autoComplete="off">
        <input className="form__input" type="text" name="title" value={formValues.title} onChange={handleInputChange} placeholder="New gift" required />
        <button className="form__button form__button--random-title" type="button" onClick={getRandomGiftTitle}>Get a random gift!</button>
        <input className="form__input form__input--below" type="text" name="price" pattern="[0-9]+" value={formValues.price} onChange={handleInputChange} placeholder="Price" required />
        <input className="form__input form__input--below" type="text" name="recipient" value={formValues.recipient} onChange={handleInputChange} placeholder="This gift is to..." required />
        <input className="form__input form__input--below" type="number" min="1" name="quantity" value={formValues.quantity} onChange={handleInputChange} placeholder="Quantity" required />
        <input className="form__input form__input--below" type="url" name="source" value={formValues.source} onChange={handleInputChange} placeholder="Image link" pattern="https://.*" required />
        <button className="form__button" type="submit">{editMode ? 'Save' :  'Add'}</button>
        <button className="form__button form__button--close" type="button" onClick={handleToggleModal}>Close</button>
      </form>
    )
  }

  const handleToggleModal = () => {
    setOverlay(!overlay);
    setModalState(!modalState);
    setTimeout(() => {
      if(overlay && modalState) {
        setEditMode(false);
        setFormValues({
          title: '',
          price: '',
          recipient: '',
          quantity: 1,
          source: ''
        });
      }
      if(!modalState) {
        const inputTitle = document.querySelector<HTMLInputElement>('input[name="title"]');
        inputTitle?.focus();
      }
    }, 250);
  }

  const total = list.reduce((total, item) => {
    return total + (Number(item.price) * item.quantity);
  }, 0);

  return (
    <>
      <div className="wish-list-card">
        <h1 className="wish-list-card__title">Gifts</h1>
        {list.length > 0 && !loading ?
          <>
            <ul className="wish-list-card__items">
              {list.map((item, index) =>
                <li className="wish-list-card__item" key={index}>
                  <div className="wish-list-card__item-info">
                    <img className="wish-list-card__item-image" src={item.source} />
                    <div className="wish-list-card__item-text">
                      <span>{item.title} ({item.quantity}) - ${Number(item.price) * item.quantity}</span>
                      <span className="wish-list-card__item-recipient">{item.recipient}</span>
                    </div>
                  </div>
                  <div className="wish-list-card__actions">
                    <span
                      className="wish-list-card__action wish-list-card__action--edit"
                      data-item-title={item.title}
                      onClick={handleEditItem}
                      tabIndex={0}
                      onKeyPress={(e) => e.key === 'Enter' && handleEditItem(e)}>
                      e
                    </span>
                    <span
                      className="wish-list-card__action wish-list-card__action--edit"
                      data-item-title={item.title}
                      onClick={handleDuplicateItem}
                      tabIndex={0}
                      onKeyPress={(e) => e.key === 'Enter' && handleDuplicateItem(e)}>
                      d
                    </span>
                    <span
                      className="wish-list-card__action wish-list-card__action--delete"
                      data-item-title={item.title}
                      onClick={handleDeleteItem}
                      tabIndex={0}
                      onKeyPress={(e) => e.key === 'Enter' && handleDeleteItem(e)}>
                      x
                    </span>
                  </div>
                </li>
              )}
            </ul>
            <div className="wish-list-card__total-container">
              <p className="wish-list-card__total">Total: ${total}</p>
            </div>
          </>
        : loading ? <p className="wish-list-card__message">Loading...</p> : <p className="wish-list-card__message">Add your first gift. Don't be a Grinch!</p>}
        <button className="form__button form__button--add" onClick={handleToggleModal}>Add gift</button>
        <button className="form__button form__button--clear" type="button" onClick={handleClearList}>Clear</button>
      </div>
      <Modal form={form()} modalState={modalState} />
      <Overlay overlayState={overlay} />
    </>
  )
}