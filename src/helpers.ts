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
  if (myOdds === 0) return 0;
  if (bookieOdds === 1) return 0;
  return (bookieOdds / myOdds - 1) / (bookieOdds - 1);
};

const amountToBet = (
  myOdds: number,
  bookieOdds: number,
  amount: number,
  min: number,
  max: number
) => {
  if (myOdds < min || myOdds > max) {
    return 0;
  }
  const k = kelly(myOdds, bookieOdds);
  if (k <= 0) return 0;
  return Math.round(amount * k);
};

const amountsToBet = (
  myOdds: GameOdds,
  bookieOdds: GameOdds,
  amount: number,
  min: number,
  max: number
) => {
  return {
    home: amountToBet(myOdds.home, bookieOdds.home, amount, min, max),
    draw: amountToBet(myOdds.draw, bookieOdds.draw, amount, min, max),
    away: amountToBet(myOdds.away, bookieOdds.away, amount, min, max)
  };
};

export { amountsToBet, formatDate, formatNumber };
