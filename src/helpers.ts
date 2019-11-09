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

const kelly = (myOdds: number, bookieOdds: number) => {
  if (myOdds <= 3.1 || myOdds >= 3.2) {
    return 0;
  }
  if (myOdds === 0) return 0;
  if (bookieOdds === 1) return 0;
  return (bookieOdds / myOdds - 1) / (bookieOdds - 1);
};

const amountToBet = (myOdds: number, bookieOdds: number, amount: number) =>
  Math.round(amount * kelly(myOdds, bookieOdds));

const amountsToBet = (
  myOdds: GameOdds,
  bookieOdds: GameOdds,
  amount: number
) => {
  return {
    home: amountToBet(myOdds.home, bookieOdds.home, amount),
    draw: amountToBet(myOdds.draw, bookieOdds.draw, amount),
    away: amountToBet(myOdds.away, bookieOdds.away, amount)
  };
};

export { amountsToBet, formatDate, formatNumber };
