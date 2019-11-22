import { GameOdds } from "./models/Game";

let numberFormat = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
let formatNumber = (n: number) => numberFormat.format(n);
let formatDate = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: false
  }).format(d);

const amountToBet = (kelly: number, amount: number) => {
  if (!kelly || kelly <= 0) return 0;
  return Math.round(amount * kelly);
};

const amountsToBet = (kellies: GameOdds, amount: number) => {
  return {
    home: amountToBet(kellies.home, amount),
    draw: amountToBet(kellies.draw, amount),
    away: amountToBet(kellies.away, amount)
  };
};

export { amountsToBet, formatDate, formatNumber };
