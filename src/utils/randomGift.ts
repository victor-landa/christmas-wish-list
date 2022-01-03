import { v4 as uuidv4 } from 'uuid';

interface Gift {
  id: string;
  title: string;
  price: string;
  source: string;
}

interface Gifts extends Array<Gift>{}

export const randomGift = () => {
  const giftTitles: Gifts = [
    {
      id: uuidv4(),
      title: 'Headphones',
      price: '999',
      source: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MX412?wid=500&hei=500&fmt=jpeg&qlt=95&.v=1580420170758'
    },
    {
      id: uuidv4(),
      title: 'Desk lamp',
      price: '199',
      source: 'https://m.media-amazon.com/images/I/61Ckk6bdzwL._AC_SL1500_.jpg'
    },
    {
      id: uuidv4(),
      title: 'Ukulele',
      price: '99',
      source: 'https://m.media-amazon.com/images/I/71CknfWH33L._AC_SL1500_.jpg'
    },
    {
      id: uuidv4(),
      title: 'Watch',
      price: '149',
      source: 'https://m.media-amazon.com/images/I/71NCQcllSyL._AC_SL1500_.jpg'
    },
    {
      id: uuidv4(),
      title: 'Xylophone',
      price: '189',
      source: 'https://m.media-amazon.com/images/I/71bIcpXz3rL._AC_SL1500_.jpg'
    },
    {
      id: uuidv4(),
      title: 'Wristband',
      price: '10',
      source: 'https://m.media-amazon.com/images/I/91ZtpcU5J+L._AC_SL1500_.jpg'
    },
    {
      id: uuidv4(),
      title: 'Nintendo Switch',
      price: '699',
      source: 'https://m.media-amazon.com/images/I/61-PblYntsL._AC_SL1500_.jpg'
    },
    {
      id: uuidv4(),
      title: 'Mario Kart 8 Deluxe',
      price: '49',
      source: 'https://m.media-amazon.com/images/I/71zMv5+rx5S._AC_SL1500_.jpg'
    },
    {
      id: uuidv4(),
      title: 'Super Smash Bros Ultimate',
      price: '49',
      source: 'https://m.media-amazon.com/images/I/81qzH0RY3DS._AC_SL1500_.jpg'
    },
    {
      id: uuidv4(),
      title: 'Fire TV Stick',
      price: '50',
      source: 'https://m.media-amazon.com/images/I/51fslL7dbqL._AC_SL1000_.jpg'
    }
  ];
  const randomTitle = giftTitles[Math.floor(Math.random() * giftTitles.length)];
  return randomTitle;
}