export class GameOdds {
  home = 0;
  draw = 0;
  away = 0;
}

export type GameInfo = {
  homeTeam: string;
  awayTeam: string;
  date: Date;
  gameLink: string;
  sport: string;
  country: string;
  league: string;
};

export type Game = {
  info: GameInfo;

  myOdds: GameOdds;
  bookieOdds: GameOdds;
  kellies: GameOdds;
};
