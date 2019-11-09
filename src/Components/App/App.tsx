import React, { useState, useEffect } from "react";
import "./App.css";
import ApiService from "../../apiService";
import { Layout, Spin } from "antd";
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

  const reloadGames = () => {
    console.log(games);
    setLoading(true);
    apiService
      .getGames()
      .then(setGames)
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
      <Spin spinning={loading} tip="Loading" size="large">
        <Layout>
          <Layout.Content style={{ marginLeft: 5 }}>
            {game ? (
              <GameView
                amount={amount}
                game={game}
                placeBet={(v: number) => {
                  setAmount(amount - v);
                  setGame(undefined);
                }}
              />
            ) : (
              <GamesList
                setAmount={setAmount}
                games={games}
                setGame={setGame}
                reload={reloadGames}
                amount={amount}
              />
            )}
          </Layout.Content>
        </Layout>
      </Spin>
    </div>
  );
};

export default App;
