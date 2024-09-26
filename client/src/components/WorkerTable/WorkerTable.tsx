import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import LogView from "../LogView/LogView";
import axios from "../../mock-api";
import { Button } from "primereact/button";
import { ApiData, Bot, Log, Worker } from "../../types";

interface PropTypes {
  bot: Bot;
}

const WorkerTable = (props: PropTypes) => {
  const { bot } = props;

  const [workers, setWorkers] = useState<ApiData<Worker>>({
    data: [],
    loading: false,
  });
  const [logs, setLogs] = useState<ApiData<Log>>({
    data: [],
    loading: false,
  });
  const [selectedWorker, setSelectedWorker] = useState<string>("");

  const fetchLogs = async (worker: Worker) => {
    setLogs({ data: [], loading: true });
    const logs = await axios
      .get(`/bots/${worker.bot}/workers/${worker.id}/logs`)
      .then((res) => res.data)
      .catch((err) => console.error(err));
    setLogs({ data: logs, loading: false });
    setSelectedWorker(worker.name);
  };

  const fetchWorkers = async () => {
    setWorkers({ data: [], loading: true });
    const workers = await axios
      .get(`/bots/${bot.id}/workers`)
      .then((res) => res.data)
      .catch((err) => console.error(err));
    setWorkers({ data: workers, loading: false });
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const logsBtn = (worker: Worker) => {
    return (
      <Button
        text
        disabled={logs.loading}
        icon={logs.loading ? "pi pi-spin pi-cog" : "pi pi-file"}
        onClick={() => fetchLogs(worker)}
        value="Logs"
        data-testid="worker-logs-btn"
      ></Button>
    );
  };

  return (
    <>
      <Card
        className="card"
        title="Workers"
        subTitle={`For ${bot?.name}`}
        data-testid="workers-card"
      >
        <DataTable
          value={workers.data}
          loading={workers.loading}
          stripedRows
          tableStyle={{ minWidth: "50vw" }}
          size="small"
        >
          <Column field="name" header="Name"></Column>
          <Column field="description" header="Description"></Column>
          <Column header="Logs" body={logsBtn}></Column>
        </DataTable>
      </Card>
      <LogView
        logs={logs}
        owner={selectedWorker}
        visible={logs.data?.length > 0}
        onClose={() => setLogs({ data: [], loading: false })}
      ></LogView>
    </>
  );
};

export default WorkerTable;
