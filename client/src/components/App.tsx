import styles from "./App.module.scss";
import BotTable from "./BotTable/BotTable";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-dark-cyan/theme.css";
import "primeicons/primeicons.css";
import WorkerTable from "./WorkerTable/WorkerTable";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import axios from "../mock-api";
import { ApiData, Bot } from "../types";

const App = () => {
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [bots, setBots] = useState<ApiData<Bot>>({
    data: [],
    loading: false,
  });

  const fetchBots = async () => {
    setBots({ data: [], loading: true });
    const res = await axios
      .get("/bots")
      .then((res) => res.data?.bots)
      .catch((err) => console.error(err));
    setBots({ data: res, loading: false });
  };

  useEffect(() => {
    fetchBots();
  }, []);

  const onWorkersSelected = (bot: Bot) => {
    setSelectedBot(bot);
  };

  return (
    <>
      <div className={styles.body}>
        <img src="./robot.png" data-testid="logo"></img>
        <h1 className="light" data-testid="page-title">
          Bot logs
        </h1>
        <div className="container" data-testid="main-content">
          <PrimeReactProvider>
            {!selectedBot ? (
              <BotTable
                bots={bots}
                onWorkersSelected={onWorkersSelected}
              ></BotTable>
            ) : (
              <>
                <Button
                  text
                  icon="pi pi-arrow-left"
                  size="small"
                  onClick={() => setSelectedBot(null)}
                  label="Back to Bots"
                ></Button>
                <WorkerTable bot={selectedBot as Bot}></WorkerTable>
              </>
            )}
          </PrimeReactProvider>
        </div>
      </div>
    </>
  );
};

export default App;
