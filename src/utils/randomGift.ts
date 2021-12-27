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
      title: 'Ready or Not',
      price: '349',
      source: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1144200/header.jpg?t=1639785519'
    },
    {
      id: uuidv4(),
      title: 'FIFA 22',
      price: '559',
      source: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1506830/header.jpg?t=1639481807'
    },
    {
      id: uuidv4(),
      title: 'Forza Horizon 5',
      price: '2069',
      source: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg?t=1640271738'
    },
    {
      id: uuidv4(),
      title: 'Apex Legends',
      price: '321',
      source: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg?t=1638900075'
    },
    {
      id: uuidv4(),
      title: 'The Sims 4',
      price: '107',
      source: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1222670/header.jpg?t=1638471912'
    },
    {
      id: uuidv4(),
      title: 'The Witcher 3: Wild Hunt',
      price: '69',
      source: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg?t=1621939214'
    },
    {
      id: uuidv4(),
      title: 'Sea of Thieves',
      price: '199',
      source: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172620/header.jpg?t=1638484040'
    },
    {
      id: uuidv4(),
      title: 'Rust',
      price: '246',
      source: 'https://cdn.cloudflare.steamstatic.com/steam/apps/252490/header_alt_assets_14.jpg?t=1640216853'
    },
    {
      id: uuidv4(),
      title: 'Cyberpunk 2077',
      price: '649',
      source: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg?t=1621944801'
    }
  ];
  const randomTitle = giftTitles[Math.floor(Math.random() * giftTitles.length)];
  return randomTitle;
}