export const convertPrice = (priceInNGN, currency) => {
  const rates = {
    NGN: 1,
    USD: 1 / 1500, // Example rate
    GBP: 1 / 2000, // Example rate
  };

  const converted = priceInNGN * rates[currency];
  return converted.toFixed(2);
};
