export type Status = "ENABLED" | "DISABLED" | "PAUSED";

export interface Bot {
  id: string;
  name: string;
  description?: string;
  status: Status;
  created: number;
}

export interface Worker {
  id: string;
  name: string;
  description?: string;
  bot: string;
  created: number;
}

export interface Log {
  id: string;
  created: string;
  message?: string;
  bot: string;
  worker: string;
}

export interface ApiData<T> {
  data: T[];
  loading: boolean;
}
