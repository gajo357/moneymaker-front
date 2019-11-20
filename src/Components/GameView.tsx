import React from "react";
import { Typography, Row, Col, Button, List } from "antd";
import { Game } from "../models/Game";
import { amountsToBet, formatDate, formatNumber } from "../helpers";

interface Props {
  amount: number;
  game: Game;
  placeBet: (amount: number) => void;
}

const GameView: React.FC<Props> = ({
  amount,
  placeBet,
  game: { info, myOdds, bookieOdds, kellies }
}) => {
  const amounts = amountsToBet(kellies, amount);

  const displayColumn = (
    caption: string,
    meanOdd: number,
    bookieOdd: number,
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
          <Col>{formatNumber(bookieOdd)}</Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col>
            <Button
              type={amountToPlace > 0 ? "primary" : "dashed"}
              onClick={() => placeBet(amountToPlace)}
            >
              Bet {formatNumber(amountToPlace)}
            </Button>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <List.Item key={info.gameLink}>
      <List.Item.Meta
        title={
          <Typography.Text>
            {info.homeTeam} - {info.awayTeam}
          </Typography.Text>
        }
        description={
          <Row type="flex" justify="space-around" gutter={[16, 16]}>
            <Col span={8}>{info.country}</Col>
            <Col span={8}>{info.league}</Col>
            <Col span={8}>{formatDate(info.date)}</Col>
          </Row>
        }
      />

      <Row type="flex" justify="center" gutter={[16, 16]}>
        <Col span={6}>
          {displayColumn("Home", myOdds.home, bookieOdds.home, amounts.home)}
        </Col>
        <Col span={6}>
          {displayColumn("Draw", myOdds.draw, bookieOdds.draw, amounts.draw)}
        </Col>
        <Col span={6}>
          {displayColumn("Away", myOdds.away, bookieOdds.away, amounts.away)}
        </Col>
      </Row>
    </List.Item>
  );
};

export default GameView;
