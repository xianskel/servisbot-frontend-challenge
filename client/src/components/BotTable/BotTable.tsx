import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import LogView from "../LogView/LogView";
import { ApiData, Bot, Log } from "../../types";
import axios from "../../mock-api";
import { useMediaQuery } from "usehooks-ts";
import BotStatus from "../BotStatus/BotStatus";

interface PropTypes {
  bots: ApiData<Bot>;
  onWorkersSelected: (bot: Bot) => void;
}

const BotTable = (props: PropTypes) => {
  const { bots, onWorkersSelected } = props;
  const [logs, setLogs] = useState<ApiData<Log>>({
    data: [],
    loading: false,
  });
  const [selectedBot, setSelectedBot] = useState<string>("");
  const isMobileScreen = useMediaQuery("(max-width: 768px)");

  const fetchLogs = async (bot: Bot) => {
    setLogs({ data: [], loading: true });
    const logs = await axios
      .get(`/bots/${bot.id}/logs`)
      .then((res) => res.data)
      .catch((err) => console.error(err));
    setLogs({ data: logs, loading: false });
    setSelectedBot(bot.name);
  };

  const statusIcon = (bot: Bot): JSX.Element => {
    return <BotStatus status={bot.status}></BotStatus>;
  };

  const workersButton = (bot: Bot): JSX.Element => {
    return (
      <Button
        text
        icon="pi pi-user"
        onClick={() => onWorkersSelected(bot)}
        value="Workers"
        data-testid="bot-workers-btn"
      ></Button>
    );
  };

  const logsButton = (bot: Bot): JSX.Element => {
    return (
      <Button
        text
        disabled={logs.loading}
        icon={logs.loading ? "pi pi-spin pi-cog" : "pi pi-file"}
        onClick={() => fetchLogs(bot)}
        value="Logs"
        data-testid="bot-logs-btn"
      ></Button>
    );
  };

  return (
    <>
      <Card className="card" title="Bots" data-testid="bots-card">
        <DataTable
          value={bots?.data}
          stripedRows
          tableStyle={{ minWidth: "50vw" }}
          size="small"
        >
          <Column field="name" header="Name"></Column>
          {!isMobileScreen && (
            <Column field="description" header="Description"></Column>
          )}
          <Column header="Status" body={statusIcon} align="center"></Column>
          <Column header="Workers" body={workersButton} align="center"></Column>
          <Column header="Logs" body={logsButton} align="center"></Column>
        </DataTable>
      </Card>
      <LogView
        logs={logs}
        owner={selectedBot}
        visible={logs.data?.length > 0}
        onClose={() => setLogs({ data: [], loading: false })}
      ></LogView>
    </>
  );
};

export default BotTable;
