import React, { useState, useEffect } from "react";
import { Typography, Row, Col, InputNumber, Button } from "antd";
import { Game, GameOdds } from "../models/Game";
import { amountsToBet, formatDate, formatNumber } from "../helpers";

interface Props {
  amount: number;
  placeBet: (amount: number) => void;
  game: Game;
}

const GameView: React.FC<Props> = ({ amount, placeBet, game }) => {
  const [odds, setOdds] = useState<GameOdds>();
  const [amounts, setAmounts] = useState<GameOdds>({
    home: 0,
    draw: 0,
    away: 0
  });

  const oddsChanged = (o: GameOdds) => {
    setOdds(o);
    const a = amountsToBet(game.meanOdds, o, amount);
    setAmounts(a);
  };

  useEffect(() => {
    oddsChanged(game.odds);
  }, []);

  const displayColumn = (
    caption: string,
    meanOdd: number,
    bookieOdd: number,
    bookieOddChanged: (v: number) => void,
    amountToPlace: number
  ) => {
    return (
      <>
        <Row gutter={[16, 16]}>
          <Col>{caption}</Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col>{formatNumber(meanOdd)}</Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col>
            <InputNumber
              step={0.1}
              min={1}
              defaultValue={bookieOdd}
              onChange={v => v && bookieOddChanged(v)}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col>
            <Button type="primary" onClick={() => placeBet(amountToPlace)}>
              Bet {formatNumber(amountToPlace)}
            </Button>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <>
      {odds && (
        <div>
          <Row type="flex" justify="space-around" gutter={[16, 16]}>
            <Col>
              <Typography.Title>
                {game.homeTeam} - {game.awayTeam}
              </Typography.Title>
            </Col>
          </Row>
          <Row type="flex" justify="space-around" gutter={[16, 16]}>
            <Col span={8}>{game.country}</Col>
            <Col span={8}>{game.league}</Col>
            <Col span={8}>{formatDate(game.date)}</Col>
          </Row>
          <Row type="flex" justify="center" gutter={[16, 16]}>
            <Col span={6}>
              {displayColumn(
                "Home",
                game.meanOdds.home,
                odds.home,
                v => oddsChanged({ ...odds, home: v }),
                amounts.home
              )}
            </Col>
            <Col span={6}>
              {displayColumn(
                "Draw",
                game.meanOdds.draw,
                odds.draw,
                v => oddsChanged({ ...odds, draw: v }),
                amounts.draw
              )}
            </Col>
            <Col span={6}>
              {displayColumn(
                "Away",
                game.meanOdds.away,
                odds.away,
                v => oddsChanged({ ...odds, away: v }),
                amounts.away
              )}
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default GameView;
