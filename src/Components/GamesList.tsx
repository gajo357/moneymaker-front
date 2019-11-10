import React from "react";
import { List, Typography, Row, Col } from "antd";
import { Game } from "../models/Game";
import { formatDate, formatNumber } from "../helpers";

interface Props {
  amount: number;
  games: Game[];
  setGame: (game: Game) => void;
}
const GamesList: React.FC<Props> = ({ games, setGame, amount }) => {
  return (
    <List itemLayout="vertical" size="large">
      {games.map(game => {
        return (
          <List.Item key={game.gameLink} onClick={() => setGame(game)}>
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
              <Col span={8}>{formatNumber(game.meanOdds.home)}</Col>
              <Col span={8}>{formatNumber(game.meanOdds.draw)}</Col>
              <Col span={8}>{formatNumber(game.meanOdds.away)}</Col>
            </Row>
          </List.Item>
        );
      })}
    </List>
  );
};
export default GamesList;
