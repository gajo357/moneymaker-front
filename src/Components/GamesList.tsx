import React from "react";
import { List, Typography, Icon, Row, Col, InputNumber } from "antd";
import { Game } from "../models/Game";
import { amountsToBet, formatDate, formatNumber } from "../helpers";

interface Props {
  setAmount: (v: number) => void;
  amount: number;
  games: Game[];
  setGame: (game: Game) => void;
  reload: () => void;
}
const GamesList: React.FC<Props> = ({
  games,
  setGame,
  reload,
  amount,
  setAmount
}) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      footer={
        <Row type="flex" justify="end">
          <Col span={6}>
            <Icon type="reload" onClick={reload}></Icon>
          </Col>

          <Col span={6}>Amount</Col>
          <Col span={6}>
            <InputNumber
              style={{ marginLeft: 10, marginBottom: 5 }}
              step={1}
              min={0}
              defaultValue={amount}
              onChange={v => v && setAmount(v)}
            />
          </Col>
        </Row>
      }
    >
      {games
        .map((game, i) => {
          const amounts = amountsToBet(game.meanOdds, game.odds, amount);
          return (
            <List.Item key={i} onClick={() => setGame(game)}>
              <List.Item.Meta
                title={
                  <Typography.Text>
                    {game.homeTeam} - {game.awayTeam}
                  </Typography.Text>
                }
                description={
                  <Row type="flex" justify="space-around" gutter={[16, 16]}>
                    <Col span={8}>{game.country}</Col>
                    <Col span={8}>{game.league}</Col>
                    <Col span={8}>{formatDate(game.date)}</Col>
                  </Row>
                }
              />
              <Row type="flex" justify="space-around" gutter={[16, 16]}>
                <Col span={8}>{formatNumber(amounts.home)}</Col>
                <Col span={8}>{formatNumber(amounts.draw)}</Col>
                <Col span={8}>{formatNumber(amounts.away)}</Col>
              </Row>
            </List.Item>
          );
        })
        .filter((_, i) => i >= 0)}
    </List>
  );
};
export default GamesList;
