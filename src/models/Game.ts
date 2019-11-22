export interface GameOdds {
  home: number;
  draw: number;
  away: number;
}

export interface GameInfo {
  homeTeam: string;
  awayTeam: string;
  date: Date;
  gameLink: string;
  sport: string;
  country: string;
  league: string;
}

export interface Game {
  info: GameInfo;

  myOdds: GameOdds;
  bookieOdds: GameOdds;
  kellies: GameOdds;
}
