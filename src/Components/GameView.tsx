import React, { useState, useEffect } from "react";
import { Typography, Row, Col, InputNumber, Button, Layout } from "antd";
import { Game, GameOdds } from "../models/Game";
import { amountsToBet, formatDate, formatNumber } from "../helpers";

interface Props {
  amount: number;
  game: Game;
  placeBet: (amount: number) => void;
  back: () => void;
}

const GameView: React.FC<Props> = ({ amount, placeBet, game, back }) => {
  const [minMax, setMinMax] = useState({ min: 3.1, max: 3.2 });
  const [odds, setOdds] = useState<GameOdds>();
  const [amounts, setAmounts] = useState<GameOdds>({
    home: 0,
    draw: 0,
    away: 0
  });

  const minMaxChanged = (min: number, max: number) => {
    setMinMax({ min: min, max: max });
    calcAmounts(min, max);
  };

  const oddsChanged = (o: GameOdds) => {
    setOdds(o);
    calcAmounts(minMax.min, minMax.max);
  };

  const calcAmounts = (min: number, max: number) => {
    if (odds) {
      const a = amountsToBet(game.meanOdds, odds, amount, min, max);
      setAmounts(a);
    }
  };

  useEffect(() => {
    console.log(game.odds);
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
    <Layout>
      <Layout.Header>
        <Typography.Title type="warning" level={2}>
          {game.homeTeam} - {game.awayTeam}
        </Typography.Title>
      </Layout.Header>

      <Layout.Content>
        <Row type="flex" justify="space-around" gutter={[16, 16]}>
          <Col span={8}>{game.country}</Col>
          <Col span={8}>{game.league}</Col>
          <Col span={8}>{formatDate(game.date)}</Col>
        </Row>
        {odds && (
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
        )}
      </Layout.Content>

      <Layout.Footer>
        <Row type="flex" justify="space-around" gutter={[16, 16]}>
          <Col span={8}>
            Min:
            <InputNumber
              style={{ marginLeft: 10 }}
              min={2.9}
              max={3.2}
              step={0.05}
              defaultValue={minMax.min}
              onChange={v => v && minMaxChanged(v, minMax.max)}
            />
          </Col>
          <Col span={8}>
            Max:
            <InputNumber
              style={{ marginLeft: 10 }}
              min={3.1}
              max={3.4}
              step={0.05}
              defaultValue={minMax.max}
              onChange={v => v && minMaxChanged(minMax.min, v)}
            />
          </Col>
        </Row>
        <Button
          icon="close"
          type="dashed"
          shape="circle"
          onClick={back}
        ></Button>
      </Layout.Footer>
    </Layout>
  );
};

export default GameView;
