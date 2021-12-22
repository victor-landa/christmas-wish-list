export const randomGift = () => {
  const giftTitles = [
    'Elderflame',
    'Zedd X Valorant SPECTRUM',
    'BlastX',
    'Glitchpop',
    'Glitchpop 2.0',
    'RGX 11Z Pro',
    'Ruination',
    'Sentinels of Light',
    'Singularity',
    'Celestial',
    'EGO by Onetap',
    'Forsaken',
    'G.U.N',
    'Ion',
    'Magepunk',
    'Magepunk 2.0',
    'Nebula',
    'Oni',
    'Origin',
    'Prime',
    'Radiant Crisis 001',
    'Reaver',
    'Recon',
    'Prime 2.0',
    'Sovereign',
    'Spline',
    'Tethered Realms',
    'VALORANT GO! Vol. 1',
    'Valorant GO! Vol. 2'
  ];
  const randomTitle = giftTitles[Math.floor(Math.random() * giftTitles.length)];
  return randomTitle;
}