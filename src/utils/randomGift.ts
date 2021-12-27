interface Gift {
  title: string;
  price: string;
  source: string;
}

export const randomGift = () => {
  const giftTitles = <Array<Gift>>[
    {
      title: 'Ready or Not',
      price: '349',
      source: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1144200/header.jpg?t=1639785519'
    },
    {
      title: 'FIFA 22',
      price: '559',
      source: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1506830/header.jpg?t=1639481807'
    },
    {
      title: 'Forza Horizon 5',
      price: '2069',
      source: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg?t=1640271738'
    },
    {
      title: 'Apex Legends',
      price: '321',
      source: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172470/header.jpg?t=1638900075'
    },
    {
      title: 'The Sims 4',
      price: '107',
      source: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1222670/header.jpg?t=1638471912'
    },
    {
      title: 'The Witcher 3: Wild Hunt',
      price: '69',
      source: 'https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg?t=1621939214'
    },
    {
      title: 'Sea of Thieves',
      price: '199',
      source: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1172620/header.jpg?t=1638484040'
    },
    {
      title: 'Rust',
      price: '246',
      source: 'https://cdn.cloudflare.steamstatic.com/steam/apps/252490/header_alt_assets_14.jpg?t=1640216853'
    },
    {
      title: 'Cyberpunk 2077',
      price: '649',
      source: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg?t=1621944801'
    }
  ];
  const randomTitle = giftTitles[Math.floor(Math.random() * giftTitles.length)];
  return randomTitle;
}