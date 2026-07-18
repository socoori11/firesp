export const calcDiscount = (price, rate = 0) => Math.round(Number(price) * (1 - Number(rate) / 100))
