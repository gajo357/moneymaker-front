import React, { useState, useEffect } from "react";
import "./App.css";
import ApiService from "../../apiService";
import { Layout, Spin, Icon, InputNumber } from "antd";
import GamesList from "../GamesList";
import GameView from "../GameView";
import { Game } from "../../models/Game";
import { showError } from "../../models/Errors";

interface Props {
  apiService: ApiService;
}

const App: React.FC<Props> = ({ apiService }) => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<number>(500);
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [games, setGames] = useState<Game[]>([]);
  const [hiddenGames, setHiddenGames] = useState<Game[]>([]);

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
  useEffect(() => {
    reloadGames();
  }, []);

  return (
    <div className="App">
      <Layout>
        <Layout.Content style={{ marginLeft: 5 }}>
          <Spin spinning={loading} tip="Loading" size="large">
            {game ? (
              <GameView
                amount={amount}
                game={game}
                placeBet={(v: number) => {
                  setAmount(amount - v);
                  setHiddenGames(hiddenGames.concat([game]));
                  setGame(undefined);
                }}
                back={() => setGame(undefined)}
              />
            ) : (
              <GamesList
                games={games.filter(
                  g => !hiddenGames.some(hg => hg.gameLink === g.gameLink)
                )}
                setGame={setGame}
                amount={amount}
              />
            )}
          </Spin>
        </Layout.Content>
        {game ? (
          <></>
        ) : (
          <Layout.Footer style={{ textAlign: "right" }}>
            {!loading && (
              <Icon
                type="reload"
                onClick={reloadGames}
                style={{ marginRight: 50 }}
              />
            )}
            Amount:
            <InputNumber
              style={{ marginLeft: 10, marginBottom: 5 }}
              step={1}
              min={0}
              defaultValue={amount}
              onChange={v => v && setAmount(v)}
            />
          </Layout.Footer>
        )}
      </Layout>
    </div>
  );
};

export default App;
