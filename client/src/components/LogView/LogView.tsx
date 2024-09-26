import { Dialog } from "primereact/dialog";
import { ApiData, Log } from "../../types";

import { DataView } from "primereact/dataview";
import { Divider } from "primereact/divider";
import style from "./LogView.module.scss";

interface PropTypes {
  visible: boolean;
  logs: ApiData<Log>;
  owner: string;
  onClose: () => void;
}

const LogView = (props: PropTypes) => {
  const { logs, visible, onClose, owner } = props;

  const itemTemplate = (log: Log) => {
    return (
      <div className={style.item} key={log.id}>
        <table data-testid="log-table">
          <tbody>
            <tr>
              <td>Id:</td>
              <td>{log.id}</td>
            </tr>
            <tr>
              <td>Date:</td>
              <td>{log.created}</td>
            </tr>
            <tr>
              <td>Bot:</td>
              <td>{log.bot}</td>
            </tr>
            <tr>
              <td>Worker:</td>
              <td>{log.worker}</td>
            </tr>
            <tr>
              <td>Message:</td>
              <td style={{ wordBreak: "break-word" }}>{log.message}</td>
            </tr>
          </tbody>
        </table>
        <Divider layout="horizontal" className="hidden md:flex"></Divider>
      </div>
    );
  };

  const listTemplate = (logs: Log[]) => {
    if (!logs || logs.length === 0) return null;

    const list = logs.map((product) => {
      return itemTemplate(product);
    });

    return <div className="grid grid-nogutter">{list}</div>;
  };

  return (
    <Dialog
      header={`Logs for ${owner}`}
      visible={visible}
      blockScroll
      className={style.dialog}
      onHide={onClose}
    >
      <DataView
        value={logs.data}
        listTemplate={listTemplate}
        paginator
        paginatorTemplate={{
          layout: "PrevPageLink CurrentPageReport NextPageLink",
        }}
        rows={10}
      />
    </Dialog>
  );
};

export default LogView;
