import React, { useState, useEffect } from "react";
import "./App.css";
import ApiService from "../../apiService";
import {
  Layout,
  Spin,
  InputNumber,
  Button,
  Tooltip,
  List,
  Row,
  Col
} from "antd";
import { Game } from "../../models/Game";
import { showError } from "../../models/Errors";
import GameView from "../GameView";

interface Props {
  apiService: ApiService;
}

const App: React.FC<Props> = ({ apiService }) => {
  const [loading, setLoading] = useState(false);
  const [loadingProbe, setLoadingProbe] = useState(false);
  const [amount, setAmount] = useState<number>(500);
  const [games, setGames] = useState<Game[]>([]);
  const [hiddenGames, setHiddenGames] = useState<string[]>([]);
  const [unresponsive, setUnresponsive] = useState<string[]>([]);

  const reloadGames = () => {
    setLoading(true);
    apiService
      .getGames()
      .then(setGames)
      .then(() => setHiddenGames([]))
      .then(() => setLoading(false))
      .catch(e => {
        showError(e);
        setLoading(false);
      });
  };
  const reloadUnresponsive = () => {
    setLoadingProbe(true);
    apiService
      .livelinessProbe()
      .then(setUnresponsive)
      .then(() => setLoadingProbe(false))
      .catch(e => {
        showError(e);
        setLoadingProbe(false);
      });
  };

  const setAndSaveAmount = (v: number) => {
    setAmount(v);
    apiService.saveAmount(v);
  };

  useEffect(() => {
    reloadGames();
    reloadUnresponsive();
    setAmount(apiService.getAmount());
  }, []);

  return (
    <div className="App">
      <Layout>
        <Layout.Content>
          <Spin
            spinning={loading}
            tip="Loading"
            size="large"
            style={{ marginLeft: 5 }}
          >
            <List itemLayout="vertical" size="large">
              {games
                .filter(g => !hiddenGames.some(hg => hg === g.info.gameLink))
                .map(game => (
                  <GameView
                    key={game.info.gameLink}
                    game={game}
                    amount={amount}
                    placeBet={(v: number) => {
                      setAndSaveAmount(amount - v);
                      setHiddenGames(hiddenGames.concat([game.info.gameLink]));
                    }}
                  />
                ))}
            </List>
          </Spin>
        </Layout.Content>
        <Layout.Footer style={{ position: "sticky", bottom: "0" }}>
          <Row type="flex" justify="center" gutter={[16, 16]}>
            <Col span={8}>
              <Tooltip title={unresponsive} visible={unresponsive.length > 0}>
                <Button
                  type={unresponsive.length > 0 ? "danger" : "dashed"}
                  icon={unresponsive.length > 0 ? "alert" : "smile"}
                  loading={loadingProbe}
                  onClick={reloadUnresponsive}
                />
              </Tooltip>
            </Col>
            <Col span={8}>
              <Button icon="reload" onClick={reloadGames} loading={loading} />
            </Col>
            <Col span={8}>
              <InputNumber
                step={1}
                min={0}
                value={amount}
                onChange={v => v && setAndSaveAmount(v)}
              />
            </Col>
          </Row>
        </Layout.Footer>
      </Layout>
    </div>
  );
};

export default App;
