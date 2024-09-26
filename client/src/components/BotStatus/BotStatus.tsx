import { Tag } from "primereact/tag";
import { useMediaQuery } from "usehooks-ts";
import { Status } from "../../types";

type Severity = "success" | "danger" | "warning";

const BotStatus = ({ status }: { status: Status }): JSX.Element => {
  const isMobileScreen = useMediaQuery("(max-width: 768px)");
  const statusMap: Record<
    Status,
    { severity: Severity; icon: string; color: string }
  > = {
    DISABLED: {
      severity: "danger",
      icon: "pi pi-exclamation-triangle",
      color: "var(--red-500)",
    },
    ENABLED: {
      severity: "success",
      icon: "pi pi-check-circle",
      color: "var(--green-500)",
    },
    PAUSED: {
      severity: "warning",
      icon: "pi pi-pause-circle",
      color: "var(--orange-500)",
    },
  };

  const mapping = statusMap[status];

  return isMobileScreen ? (
    <i className={mapping?.icon} style={{ color: mapping?.color }}></i>
  ) : (
    <Tag icon={mapping?.icon} severity={mapping?.severity} value={status}></Tag>
  );
};

export default BotStatus;
