export type League = { country: string; league: string };

export type Sport = { sport: string; leagues: League[] };

export type GameOdds = { home: number; draw: number; away: number };

export type Game = {
  homeTeam: string;
  awayTeam: string;
  date: Date;
  gameLink: string;
  sport: string;
  country: string;
  league: string;
  meanOdds: GameOdds;
  odds: GameOdds;
  noMean: number;
};
